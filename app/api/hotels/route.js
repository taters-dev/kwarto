export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const TRAVELPAYOUTS_TOKEN = process.env.TRAVELPAYOUTS_TOKEN || "";
const CEBU_LOCATION_ID = "8733";

const CEBU_HOTELS = [
  { name: "Shangri-La Mactan", searchName: "Shangri-La's Mactan Resort" },
  { name: "Crimson Mactan", searchName: "Crimson Resort Mactan" },
  { name: "Dusit Thani Mactan", searchName: "Dusit Thani Mactan Cebu" },
  { name: "JPark Island", searchName: "JPark Island Resort" },
  { name: "Mövenpick Mactan", searchName: "Movenpick Hotel Mactan" },
  { name: "Bluewater Maribago", searchName: "Bluewater Maribago Beach Resort" },
  { name: "Radisson Blu Cebu", searchName: "Radisson Blu Cebu" },
  { name: "Marco Polo Plaza", searchName: "Marco Polo Plaza Cebu" }
];

function photoUrl(hotelId, photoIndex = 0, width = 800, height = 600) {
  return `https://photo.hotellook.com/image_v2/limit/h${hotelId}_${photoIndex}/${width}/${height}.auto`;
}

async function lookupHotel(query) {
  if (!TRAVELPAYOUTS_TOKEN) return null;
  
  const url = new URL("https://engine.hotellook.com/api/v2/lookup.json");
  url.searchParams.set("query", query);
  url.searchParams.set("lang", "en");
  url.searchParams.set("lookFor", "hotel");
  url.searchParams.set("limit", "3");
  url.searchParams.set("token", TRAVELPAYOUTS_TOKEN);
  
  try {
    const r = await fetch(url.toString(), { cache: "no-store" });
    if (!r.ok) return null;
    const data = await r.json();
    const hotels = data && data.results && data.results.hotels;
    if (!hotels || !hotels.length) return null;
    return hotels[0];
  } catch {
    return null;
  }
}

async function getHotelPrices(locationId, checkIn, checkOut, currency = "USD") {
  if (!TRAVELPAYOUTS_TOKEN) return [];
  
  const url = new URL("https://engine.hotellook.com/api/v2/cache.json");
  url.searchParams.set("locationId", locationId);
  url.searchParams.set("checkIn", checkIn);
  url.searchParams.set("checkOut", checkOut);
  url.searchParams.set("currency", currency.toLowerCase());
  url.searchParams.set("limit", "20");
  url.searchParams.set("token", TRAVELPAYOUTS_TOKEN);
  
  try {
    const r = await fetch(url.toString(), { cache: "no-store" });
    if (!r.ok) return [];
    const data = await r.json();
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

async function getHotelsStatic(locationId) {
  if (!TRAVELPAYOUTS_TOKEN) return [];
  
  const url = new URL("https://engine.hotellook.com/api/v2/static/hotels.json");
  url.searchParams.set("locationId", locationId);
  url.searchParams.set("token", TRAVELPAYOUTS_TOKEN);
  
  try {
    const r = await fetch(url.toString(), { cache: "no-store" });
    if (!r.ok) return [];
    const data = await r.json();
    return data && data.hotels ? data.hotels : [];
  } catch {
    return [];
  }
}

function formatDate(d) {
  return d.toISOString().split("T")[0];
}

export async function GET(request) {
  const params = new URL(request.url).searchParams;
  const location = params.get("location") || "cebu";
  const checkIn = params.get("checkIn") || formatDate(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000));
  const checkOut = params.get("checkOut") || formatDate(new Date(Date.now() + 10 * 24 * 60 * 60 * 1000));
  const currency = params.get("currency") || "USD";
  
  if (!TRAVELPAYOUTS_TOKEN) {
    return Response.json({
      error: "TRAVELPAYOUTS_TOKEN environment variable not configured",
      hint: "Get your token at https://www.travelpayouts.com/programs/100/tools/api",
      hotels: []
    }, { status: 503 });
  }
  
  const locationId = location.toLowerCase() === "cebu" ? CEBU_LOCATION_ID : location;
  
  const [staticHotels, pricesData] = await Promise.all([
    getHotelsStatic(locationId),
    getHotelPrices(locationId, checkIn, checkOut, currency)
  ]);
  
  const priceMap = new Map();
  for (const p of pricesData) {
    if (p.hotelId) {
      priceMap.set(String(p.hotelId), p);
    }
  }
  
  const results = [];
  
  for (const target of CEBU_HOTELS) {
    let match = staticHotels.find(h => {
      const n = (h.name || "").toLowerCase();
      return n.includes(target.name.toLowerCase().split(" ")[0]) ||
             n.includes(target.searchName.toLowerCase().split(" ")[0]);
    });
    
    if (!match && TRAVELPAYOUTS_TOKEN) {
      const lookup = await lookupHotel(target.searchName + " Cebu");
      if (lookup && lookup.id) {
        match = { id: lookup.id, name: lookup.label || target.name };
      }
    }
    
    if (match) {
      const hotelId = String(match.id);
      const price = priceMap.get(hotelId);
      
      const photos = match.photos && match.photos.length > 0
        ? match.photos.map(p => p.url)
        : [photoUrl(match.id, 0, 800, 600)];
      
      results.push({
        id: hotelId,
        name: target.name,
        fullName: match.name,
        stars: match.stars || 5,
        rating: match.rating || null,
        photos,
        mainPhoto: photos[0],
        priceFrom: price ? price.priceFrom : null,
        priceAvg: price ? price.priceAvg : null,
        currency: currency.toUpperCase(),
        location: match.location || null,
        address: match.address || null
      });
    } else {
      results.push({
        id: null,
        name: target.name,
        fullName: target.name,
        stars: 5,
        rating: null,
        photos: [],
        mainPhoto: null,
        priceFrom: null,
        priceAvg: null,
        currency: currency.toUpperCase(),
        location: null,
        address: null
      });
    }
  }
  
  return Response.json({
    location: location,
    locationId,
    checkIn,
    checkOut,
    currency: currency.toUpperCase(),
    hotels: results,
    hasToken: !!TRAVELPAYOUTS_TOKEN
  });
}
