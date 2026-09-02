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

async function searchHotels(destId, destType, checkIn, checkOut, options = {}) {
  if (!RAPIDAPI_KEY) return null;
  
  const {
    page = 0,
    sortBy = "popularity",
    minPrice = "",
    maxPrice = "",
    minRating = "",
    stars = "",
    freeCancellation = false,
    freeParking = false
  } = options;
  
  const params = new URLSearchParams({
    dest_ids: destId,
    dest_type: destType || "city",
    arrival_date: checkIn,
    departure_date: checkOut,
    room_qty: "1",
    guest_qty: "2",
    order_by: sortBy,
    languagecode: "en-us",
    currency_code: "USD",
    page_number: String(page)
  });
  
  // Add optional filters
  if (minPrice) params.set("price_filter_currencycode", "USD");
  if (minPrice) params.set("price_min", minPrice);
  if (maxPrice) params.set("price_max", maxPrice);
  if (stars) params.set("class_filter", stars);
  if (freeCancellation) params.set("nflt", "fc=1");
  if (minRating) params.set("review_score", minRating);
  
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

export async function GET(request) {
  const params = new URL(request.url).searchParams;
  const checkIn = params.get("checkIn") || formatDate(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000));
  const checkOut = params.get("checkOut") || formatDate(new Date(Date.now() + 10 * 24 * 60 * 60 * 1000));
  const currency = (params.get("currency") || "USD").toUpperCase();
  const page = parseInt(params.get("page") || "0", 10);
  const city = params.get("city") || "Cebu";
  
  // Sorting
  const sortBy = params.get("sortBy") || "popularity";
  
  // Filters
  const minPrice = params.get("minPrice") || "";
  const maxPrice = params.get("maxPrice") || "";
  const minRating = params.get("minRating") || "";
  const stars = params.get("stars") || "";
  const freeCancellation = params.get("freeCancellation") === "true";
  const freeParking = params.get("freeParking") === "true";
  
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
  
  const searchOptions = {
    page,
    sortBy,
    minPrice,
    maxPrice,
    minRating,
    stars,
    freeCancellation,
    freeParking
  };
  
  const data = await searchHotels(destination.dest_id, destination.dest_type, checkIn, checkOut, searchOptions);
  
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
  
  // Return the full Booking.com page (typically 20–30 properties); the client
  // sorts, filters, and paginates locally. Photos are fetched lazily via /api/hotels/photos.
  const hotelItems = data.result
    .filter(item => item.type === "property_card" && item.hotel_id);
  
  const results = hotelItems.map(hotel => {
      const priceBreakdown = hotel.composite_price_breakdown;
      let priceUSD = null;
      
      if (priceBreakdown?.gross_amount_per_night?.value) {
        priceUSD = Math.round(priceBreakdown.gross_amount_per_night.value);
      } else if (priceBreakdown?.gross_amount?.value) {
        priceUSD = Math.round(priceBreakdown.gross_amount.value / 3);
      }
      
      // Main photo from list endpoint - additional photos fetched lazily
      const mainPhotoUrl = hotel.main_photo_url || null;
      const photo = mainPhotoUrl ? mainPhotoUrl.replace('/square60/', '/max500/') : null;
      
      return {
        id: hotel.hotel_id,
        name: hotel.hotel_name_trans || hotel.hotel_name,
        fullName: hotel.hotel_name_trans || hotel.hotel_name,
        stars: hotel.class || 0,
        rating: hotel.review_score || null,
        reviewCount: hotel.review_nr || 0,
        photo: photo,
        priceUSD: priceUSD,
        pricePHP: priceUSD ? Math.round(priceUSD * 57) : null,
        city: hotel.city_in_trans?.replace("in ", "") || destination.city_name || city,
        district: hotel.distances?.[0]?.text || null,
        hasFreeCancellation: hotel.is_free_cancellable === 1,
        hasFreeParking: hotel.has_free_parking === 1,
        badges: hotel.badges?.map(b => b.text) || []
      };
    });
  
  const totalCount = data.primary_count || results.length;
  const pageSize = results.length;
  const hasMore = pageSize > 0 && (page + 1) * pageSize < totalCount;
  
  return Response.json({
    checkIn,
    checkOut,
    currency,
    city: destination.city_name || city,
    page,
    pageSize,
    totalCount,
    hasMore,
    filters: {
      sortBy,
      minPrice: minPrice || null,
      maxPrice: maxPrice || null,
      minRating: minRating || null,
      stars: stars || null,
      freeCancellation,
      freeParking
    },
    hotels: results,
    hasKey: !!RAPIDAPI_KEY
  });
}
