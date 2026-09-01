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
  
  const results = data.result
    .filter(item => item.type === "property_card" && item.hotel_id)
    .slice(0, 12)
    .map(hotel => {
      const priceBreakdown = hotel.composite_price_breakdown;
      let priceUSD = null;
      
      if (priceBreakdown?.gross_amount_per_night?.value) {
        priceUSD = Math.round(priceBreakdown.gross_amount_per_night.value);
      } else if (priceBreakdown?.gross_amount?.value) {
        priceUSD = Math.round(priceBreakdown.gross_amount.value / 3);
      }
      
      const photoUrl = hotel.main_photo_url || null;
      const photo = photoUrl ? photoUrl.replace('/square60/', '/max300/') : null;
      
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
  
  return Response.json({
    checkIn,
    checkOut,
    currency,
    city: destination.city_name || city,
    page,
    totalCount: data.primary_count || results.length,
    hotels: results,
    hasKey: !!RAPIDAPI_KEY
  });
}
