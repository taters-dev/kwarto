export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY || "";
const RAPIDAPI_HOST = "apidojo-booking-v1.p.rapidapi.com";

export async function GET(request) {
  const params = new URL(request.url).searchParams;
  const hotelId = params.get("hotelId");
  
  if (!hotelId) {
    return Response.json({ error: "hotelId is required", photos: [] }, { status: 400 });
  }
  
  if (!RAPIDAPI_KEY) {
    return Response.json({ error: "API not configured", photos: [] }, { status: 503 });
  }
  
  try {
    const apiParams = new URLSearchParams({
      hotel_ids: hotelId,
      languagecode: "en-us"
    });
    
    const url = `https://${RAPIDAPI_HOST}/properties/get-hotel-photos?${apiParams.toString()}`;
    
    const r = await fetch(url, {
      headers: {
        "x-rapidapi-host": RAPIDAPI_HOST,
        "x-rapidapi-key": RAPIDAPI_KEY
      },
      cache: "no-store"
    });
    
    if (!r.ok) {
      return Response.json({ error: "Failed to fetch photos", photos: [] });
    }
    
    const data = await r.json();
    
    if (!data) {
      return Response.json({ hotelId, photos: [] });
    }
    
    // Parse photos from response
    // Format: { url_prefix: "https://cf.bstatic.com", data: { "hotel_id": [[photo_arrays]] } }
    // Each photo array: [1, [], photo_id, [tags], "/path/max1024.jpg", "/path/max300.jpg", ...]
    const photoUrls = [];
    
    const urlPrefix = data.url_prefix || "https://cf.bstatic.com";
    const hotelData = data.data && data.data[hotelId];
    
    if (hotelData && Array.isArray(hotelData)) {
      hotelData.slice(0, 8).forEach(photoArr => {
        if (Array.isArray(photoArr)) {
          let foundUrl = null;
          // Find URL path in the array (usually at index 4 or 5)
          for (let i = 4; i < photoArr.length && !foundUrl; i++) {
            const item = photoArr[i];
            if (typeof item === 'string' && item.startsWith('/xdata/images/')) {
              // Prefer max1024 or max500 size
              if (item.includes('max1024') || item.includes('max500')) {
                foundUrl = urlPrefix + item;
              }
            }
          }
          // Fallback: just take the first URL path found
          if (!foundUrl) {
            for (let i = 4; i < photoArr.length && !foundUrl; i++) {
              const item = photoArr[i];
              if (typeof item === 'string' && item.startsWith('/')) {
                foundUrl = urlPrefix + item;
              }
            }
          }
          if (foundUrl && !photoUrls.includes(foundUrl)) {
            photoUrls.push(foundUrl);
          }
        }
      });
    }
    
    return Response.json({
      hotelId,
      photos: photoUrls
    });
  } catch (e) {
    console.error("Photo fetch error:", e);
    return Response.json({ error: "Failed to fetch photos", photos: [] });
  }
}
