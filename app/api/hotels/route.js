export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY || "";
const RAPIDAPI_HOST = "apidojo-booking-v1.p.rapidapi.com";

const CEBU_HOTELS = [
  { name: "Shangri-La Mactan", search: "Shangri-La Mactan Cebu" },
  { name: "Crimson Mactan", search: "Crimson Resort Mactan" },
  { name: "Dusit Thani Mactan", search: "Dusit Thani Mactan" },
  { name: "JPark Island", search: "JPark Island Resort Cebu" },
  { name: "Mövenpick Mactan", search: "Movenpick Mactan Cebu" },
  { name: "Bluewater Maribago", search: "Bluewater Maribago" },
  { name: "Radisson Blu Cebu", search: "Radisson Blu Cebu" },
  { name: "Marco Polo Plaza", search: "Marco Polo Plaza Cebu" }
];

function formatDate(d) {
  return d.toISOString().split("T")[0];
}

function upgradeImageUrl(url, size = "max500") {
  if (!url) return null;
  return url
    .replace(/\/square\d+\//, `/${size}/`)
    .replace(/\/max\d+x\d+\//, `/${size}/`)
    .replace(/\/150x150\//, `/${size}/`);
}

async function findHotel(searchQuery) {
  if (!RAPIDAPI_KEY) return null;
  
  const params = new URLSearchParams({
    text: searchQuery,
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
    
    const hotel = data.find(item => item.dest_type === "hotel" || item.type === "ho");
    return hotel || null;
  } catch (e) {
    console.error("Hotel search error:", e);
    return null;
  }
}

async function getHotelRooms(hotelId, checkIn, checkOut) {
  if (!RAPIDAPI_KEY || !hotelId) return null;
  
  const params = new URLSearchParams({
    hotel_id: String(hotelId),
    arrival_date: checkIn,
    departure_date: checkOut,
    rec_guest_qty: "2",
    rec_room_qty: "1",
    currency_code: "USD",
    languagecode: "en-us",
    units: "metric"
  });
  
  const url = `https://${RAPIDAPI_HOST}/properties/v2/get-rooms?${params.toString()}`;
  
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
    console.error("Room fetch error:", e);
    return null;
  }
}

export async function GET(request) {
  const params = new URL(request.url).searchParams;
  const checkIn = params.get("checkIn") || formatDate(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000));
  const checkOut = params.get("checkOut") || formatDate(new Date(Date.now() + 10 * 24 * 60 * 60 * 1000));
  const currency = (params.get("currency") || "USD").toUpperCase();
  
  if (!RAPIDAPI_KEY) {
    return Response.json({
      error: "RAPIDAPI_KEY environment variable not configured",
      hint: "Get your key at https://rapidapi.com/apidojo/api/booking",
      hotels: []
    }, { status: 503 });
  }
  
  const results = [];
  
  for (const target of CEBU_HOTELS) {
    const found = await findHotel(target.search);
    
    if (found) {
      const hotelId = found.dest_id;
      const rooms = await getHotelRooms(hotelId, checkIn, checkOut);
      
      let minPrice = null;
      let currency_code = "USD";
      
      if (rooms && rooms.block) {
        for (const block of rooms.block) {
          const price = block.min_total_price || block.product_price_breakdown?.gross_amount?.value;
          if (price && (!minPrice || price < minPrice)) {
            minPrice = price;
            currency_code = block.product_price_breakdown?.gross_amount?.currency || "USD";
          }
        }
      }
      
      const priceUSD = minPrice ? (currency_code === "USD" ? minPrice : Math.round(minPrice / 57)) : null;
      
      results.push({
        id: hotelId,
        name: target.name,
        fullName: found.name || found.label,
        stars: found.class || 5,
        rating: found.review_score || null,
        photo: upgradeImageUrl(found.image_url, "max500"),
        photoLarge: upgradeImageUrl(found.image_url, "max1024x768"),
        priceUSD: priceUSD ? Math.round(priceUSD) : null,
        pricePHP: priceUSD ? Math.round(priceUSD * 57) : null,
        city: found.city_name || "Cebu",
        region: found.region || "Visayas"
      });
    } else {
      results.push({
        id: null,
        name: target.name,
        fullName: target.name,
        stars: 5,
        rating: null,
        photo: null,
        photoLarge: null,
        priceUSD: null,
        pricePHP: null,
        city: "Cebu",
        region: "Visayas"
      });
    }
  }
  
  return Response.json({
    checkIn,
    checkOut,
    currency,
    hotels: results,
    hasKey: !!RAPIDAPI_KEY
  });
}
