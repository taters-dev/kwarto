export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY || "";
const RAPIDAPI_HOST = "apidojo-booking-v1.p.rapidapi.com";

function formatDate(d) {
  return d.toISOString().split("T")[0];
}

async function findDestination(query) {
  if (!RAPIDAPI_KEY || !query) return null;
  
  const params = new URLSearchParams({
    text: query,
    languagecode: "en-us"
  });
  
  const url = `https://${RAPIDAPI_HOST}/locations/auto-complete?${params.toString()}`;
  
  try {
    const r = await fetch(url, {
      headers: {
        "x-rapidapi-host": RAPIDAPI_HOST,
        "x-rapidapi-key": RAPIDAPI_KEY
      },
      cache: "no-store"
    });
    
    if (!r.ok) return null;
    const data = await r.json();
    
    const city = data.find(item => item.dest_type === "city");
    return city || data[0] || null;
  } catch (e) {
    console.error("Destination search error:", e);
    return null;
  }
}

async function searchHotels(destId, destType, checkIn, checkOut, page = 0) {
  if (!RAPIDAPI_KEY) return null;
  
  const params = new URLSearchParams({
    dest_ids: destId,
    dest_type: destType || "city",
    arrival_date: checkIn,
    departure_date: checkOut,
    room_qty: "1",
    guest_qty: "2",
    order_by: "popularity",
    languagecode: "en-us",
    currency_code: "USD",
    page_number: String(page)
  });
  
  const url = `https://${RAPIDAPI_HOST}/properties/v2/list?${params.toString()}`;
  
  try {
    const r = await fetch(url, {
      headers: {
        "x-rapidapi-host": RAPIDAPI_HOST,
        "x-rapidapi-key": RAPIDAPI_KEY
      },
      cache: "no-store"
    });
    
    if (!r.ok) return null;
    return await r.json();
  } catch (e) {
    console.error("Hotel search error:", e);
    return null;
  }
}

async function fetchHotelPhotos(hotelIds) {
  if (!RAPIDAPI_KEY || !hotelIds || hotelIds.length === 0) return {};
  
  const photosMap = {};
  
  // The API might only accept one hotel at a time, so we'll try batch first then fallback
  const params = new URLSearchParams({
    hotel_ids: hotelIds.slice(0, 6).join(","),  // Limit to first 6 hotels
    languagecode: "en-us"
  });
  
  const url = `https://${RAPIDAPI_HOST}/properties/get-hotel-photos?${params.toString()}`;
  
  try {
    const r = await fetch(url, {
      headers: {
        "x-rapidapi-host": RAPIDAPI_HOST,
        "x-rapidapi-key": RAPIDAPI_KEY
      },
      cache: "no-store"
    });
    
    if (!r.ok) {
      console.error("Photos API error:", r.status);
      return {};
    }
    
    const data = await r.json();
    
    if (!data) return {};
    
    // Handle different response formats from the API
    // Format 1: { "hotel_id": [ {photo objects} ] }
    // Format 2: { data: [ {photo with hotel_id} ] }
    // Format 3: [ {photo objects with hotel_id} ]
    
    function extractPhotoUrl(photo) {
      // Try different URL field names
      return photo.url_max || 
             photo.url_1440 || 
             photo.url_original || 
             photo.large_url ||
             photo.url_square60?.replace('/square60/', '/max500/') ||
             photo.url ||
             (typeof photo === 'string' ? photo : null);
    }
    
    if (Array.isArray(data)) {
      // Response is an array of photos
      data.forEach(photo => {
        const hotelId = photo.hotel_id || photo.property_id;
        if (hotelId) {
          if (!photosMap[hotelId]) photosMap[hotelId] = [];
          const url = extractPhotoUrl(photo);
          if (url && photosMap[hotelId].length < 5) {
            photosMap[hotelId].push(url);
          }
        }
      });
    } else if (data.data && Array.isArray(data.data)) {
      // Response has a data array
      data.data.forEach(photo => {
        const hotelId = photo.hotel_id || photo.property_id;
        if (hotelId) {
          if (!photosMap[hotelId]) photosMap[hotelId] = [];
          const url = extractPhotoUrl(photo);
          if (url && photosMap[hotelId].length < 5) {
            photosMap[hotelId].push(url);
          }
        }
      });
    } else if (typeof data === "object") {
      // Response is an object keyed by hotel_id
      Object.entries(data).forEach(([key, value]) => {
        const hotelId = key;
        if (Array.isArray(value)) {
          photosMap[hotelId] = value
            .slice(0, 5)
            .map(p => extractPhotoUrl(p))
            .filter(Boolean);
        } else if (value && Array.isArray(value.photos)) {
          photosMap[hotelId] = value.photos
            .slice(0, 5)
            .map(p => extractPhotoUrl(p))
            .filter(Boolean);
        }
      });
    }
    
    return photosMap;
  } catch (e) {
    console.error("Hotel photos error:", e);
    return {};
  }
}

export async function GET(request) {
  const params = new URL(request.url).searchParams;
  const checkIn = params.get("checkIn") || formatDate(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000));
  const checkOut = params.get("checkOut") || formatDate(new Date(Date.now() + 10 * 24 * 60 * 60 * 1000));
  const currency = (params.get("currency") || "USD").toUpperCase();
  const page = parseInt(params.get("page") || "0", 10);
  const city = params.get("city") || "Cebu";
  
  if (!RAPIDAPI_KEY) {
    return Response.json({
      error: "RAPIDAPI_KEY environment variable not configured",
      hint: "Get your key at https://rapidapi.com/apidojo/api/booking",
      hotels: []
    }, { status: 503 });
  }
  
  const destination = await findDestination(city);
  
  if (!destination) {
    return Response.json({
      checkIn,
      checkOut,
      currency,
      city,
      hotels: [],
      hasKey: !!RAPIDAPI_KEY,
      error: "City not found"
    });
  }
  
  const data = await searchHotels(destination.dest_id, destination.dest_type, checkIn, checkOut, page);
  
  if (!data || !data.result) {
    return Response.json({
      checkIn,
      checkOut,
      currency,
      city: destination.city_name || city,
      hotels: [],
      hasKey: !!RAPIDAPI_KEY,
      error: "Failed to fetch hotels"
    });
  }
  
  const hotelItems = data.result
    .filter(item => item.type === "property_card" && item.hotel_id)
    .slice(0, 12);
  
  // Get hotel IDs for photo fetch
  const hotelIds = hotelItems.map(h => h.hotel_id);
  
  // Fetch photos for all hotels in parallel
  const photosMap = await fetchHotelPhotos(hotelIds);
  
  const results = hotelItems.map(hotel => {
      const priceBreakdown = hotel.composite_price_breakdown;
      let priceUSD = null;
      
      if (priceBreakdown?.gross_amount_per_night?.value) {
        priceUSD = Math.round(priceBreakdown.gross_amount_per_night.value);
      } else if (priceBreakdown?.gross_amount?.value) {
        priceUSD = Math.round(priceBreakdown.gross_amount.value / 3);
      }
      
      // Start with main photo from list endpoint
      const photos = [];
      const mainPhotoUrl = hotel.main_photo_url || null;
      if (mainPhotoUrl) {
        photos.push(mainPhotoUrl.replace('/square60/', '/max500/'));
      }
      
      // Add photos from the photos endpoint
      const additionalPhotos = photosMap[hotel.hotel_id] || [];
      additionalPhotos.forEach(url => {
        if (url && !photos.includes(url)) {
          photos.push(url);
        }
      });
      
      return {
        id: hotel.hotel_id,
        name: hotel.hotel_name_trans || hotel.hotel_name,
        fullName: hotel.hotel_name_trans || hotel.hotel_name,
        stars: hotel.class || 0,
        rating: hotel.review_score || null,
        reviewCount: hotel.review_nr || 0,
        photo: photos[0] || null,
        photos: photos.slice(0, 5),
        priceUSD: priceUSD,
        pricePHP: priceUSD ? Math.round(priceUSD * 57) : null,
        city: hotel.city_in_trans?.replace("in ", "") || destination.city_name || city,
        district: hotel.distances?.[0]?.text || null,
        hasFreeCancellation: hotel.is_free_cancellable === 1,
        hasFreeParking: hotel.has_free_parking === 1,
        badges: hotel.badges?.map(b => b.text) || []
      };
    });
  
  // Check if debug mode is requested
  const debug = params.get("debug") === "1";
  
  const response = {
    checkIn,
    checkOut,
    currency,
    city: destination.city_name || city,
    page,
    totalCount: data.primary_count || results.length,
    hotels: results,
    hasKey: !!RAPIDAPI_KEY
  };
  
  if (debug) {
    response.debug = {
      hotelIds: hotelIds,
      photosFound: Object.keys(photosMap).length,
      samplePhotos: Object.fromEntries(
        Object.entries(photosMap).slice(0, 2)
      )
    };
  }
  
  return Response.json(response);
}
