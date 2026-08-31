export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// Typeahead only. Agoda GetUnifiedSuggestResult resolves a city/area/hotel
// label and ids for search. It is not a Kwarto hotel inventory feed — Agoda is
// not a provider. Hotel lists come from /api/hotels (Klook/KKday when wired).

const SUGGEST_CAP = 8;

function num(v) {
  const n = Number(v);
  return Number.isFinite(n) && n > 0 ? n : 0;
}

function paramsOf(it) {
  const out = {};
  try {
    const u = new URL(String(it && it.ResultUrl || ""), "https://www.agoda.com");
    for (const k of ["city", "area", "hotel", "selectedproperty", "poi"]) {
      const v = u.searchParams.get(k);
      if (v) out[k] = v;
    }
  } catch (e) {}
  return out;
}

function labelOf(it) {
  const dn = (it && it.DisplayNames) || {};
  const name = String(dn.Name || (it && it.Name) || "").trim();
  const geo = String(dn.GeoHierarchyName || (it && it.CityName) || "").trim();
  if (name && geo) {
    const n = name.toLowerCase();
    const g = geo.toLowerCase();
    if (n !== g && n.indexOf(g) === -1) return name + ", " + geo;
  }
  return name || geo;
}

function cityNameOf(it) {
  const dn = (it && it.DisplayNames) || {};
  return String(dn.GeoHierarchyName || (it && it.CityName) || "").trim();
}

function mapItem(it) {
  if (!it) return null;
  const type = it.ObjectTypeId;
  if (type === 0) return null;
  const p = paramsOf(it);
  let city = num(p.city) || num(it.CityId);
  const hotel = num(p.hotel || p.selectedproperty) || (type === 32 || it.IsHotel ? num(it.ObjectId) : 0);
  const area = num(p.area) || (type === 4 ? num(it.ObjectId) : 0);
  if (!city && (type === 1)) city = num(it.ObjectId);
  if (!city && hotel) city = num(it.CityId);
  if (!city && !area && !hotel) return null;
  const dn = it.DisplayNames || {};
  const cat = String(dn.CategoryName || "").toLowerCase();
  let kind = "city";
  if (hotel) kind = "hotel";
  else if (area) kind = "area";
  else if (type === 16 || cat === "airport") kind = "airport";
  const dest = { label: labelOf(it), kind };
  if (city) dest.cityId = city;
  if (area) dest.areaId = area;
  if (hotel) dest.hotelId = hotel;
  const cityName = cityNameOf(it);
  if (cityName) dest.cityName = cityName;
  return dest;
}

function listSuggest(data) {
  const items = Array.isArray(data && data.ViewModelList) ? data.ViewModelList : [];
  const out = [];
  const seen = new Set();
  for (const it of items) {
    const row = mapItem(it);
    if (!row) continue;
    const key = row.hotelId ? "h" + row.hotelId : row.areaId ? "a" + row.areaId : "c" + row.cityId;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(row);
    if (out.length >= SUGGEST_CAP) break;
  }
  return out;
}

function pickDest(data, suggestions) {
  if (suggestions && suggestions.length) {
    const city = suggestions.find((s) => s.kind === "city" || (s.cityId && !s.hotelId && !s.areaId));
    return city || suggestions[0];
  }
  const items = Array.isArray(data && data.ViewModelList) ? data.ViewModelList : [];
  if (!items.length) return null;
  const ranked = items.map((it) => ({ it, p: paramsOf(it), type: it.ObjectTypeId }));
  const firstHotel = ranked.find((r) => r.p.hotel || r.p.selectedproperty || r.type === 32);
  const firstCity = ranked.find((r) => r.p.city || r.type === 0 || r.type === 1);
  const firstArea = ranked.find((r) => r.p.area || r.type === 4);
  const headHotel = !!(ranked[0] && (ranked[0].p.hotel || ranked[0].p.selectedproperty));
  const chosen = headHotel && firstHotel ? firstHotel : (firstCity || firstArea || firstHotel || ranked[0]);
  return mapItem(chosen && chosen.it);
}

async function fetchAgoda(q) {
  const url = "https://www.agoda.com/api/cronos/search/GetUnifiedSuggestResult/3/1/1/0/en-us/?" +
    new URLSearchParams({ searchText: q, origin: "US", cid: "-1", pageTypeId: "1" }).toString();
  const r = await fetch(url, {
    headers: {
      Accept: "application/json",
      "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
      Referer: "https://www.agoda.com/",
      Origin: "https://www.agoda.com"
    },
    cache: "no-store"
  });
  if (!r.ok) return null;
  return r.json();
}

export async function GET(request) {
  const req = new URL(request.url);
  const q = (req.searchParams.get("q") || "").trim();
  if (q.length < 2) return Response.json({ dest: null, suggestions: [], hotels: [] });
  try {
    const data = await fetchAgoda(q);
    if (!data) return Response.json({ dest: null, suggestions: [], hotels: [] });
    const suggestions = listSuggest(data);
    const dest = pickDest(data, suggestions);
    return Response.json({
      dest,
      suggestions,
      hotels: [],
      source: "agoda-suggest-typeahead"
    });
  } catch (e) {
    return Response.json({ dest: null, suggestions: [], hotels: [] });
  }
}
