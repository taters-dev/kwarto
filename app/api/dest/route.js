export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// Hotel names come from Agoda GetUnifiedSuggestResult (already used for typeahead).
// That endpoint has no skip/page and returns ~7 rows per query, so a city list is
// built by asking for the city plus its areas and a few lodging words. This is not
// a full inventory API — only what suggest returns, deduped. No prices.

const SUGGEST_CAP = 8;
const LODGING_WORDS = ["hotel", "hostel", "inn", "resort", "suites", "lodge", "stay"];
const MAX_AREA_QUERIES = 8;
const MAX_HOTEL_QUERIES = 14;

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

function listHotels(data) {
  const items = Array.isArray(data && data.ViewModelList) ? data.ViewModelList : [];
  const out = [];
  const seen = new Set();
  for (const it of items) {
    const row = mapItem(it);
    if (!row || !row.hotelId) continue;
    const key = "h" + row.hotelId;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(row);
  }
  return out;
}

function listAreas(data) {
  const items = Array.isArray(data && data.ViewModelList) ? data.ViewModelList : [];
  const out = [];
  const seen = new Set();
  for (const it of items) {
    const row = mapItem(it);
    if (!row || !row.areaId) continue;
    const key = "a" + row.areaId;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(row);
  }
  return out;
}

function mergeHotels(base, extra) {
  const out = [];
  const seen = new Set();
  for (const row of (base || []).concat(extra || [])) {
    if (!row || !row.hotelId) continue;
    const key = "h" + row.hotelId;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(row);
  }
  return out;
}

function cityTitle(dest, q) {
  if (dest && dest.kind === "city" && dest.label) return dest.label.split(",")[0].trim();
  if (dest && dest.cityName) return dest.cityName.split(",")[0].trim();
  if (dest && dest.label && dest.label.indexOf(",") !== -1) {
    return dest.label.split(",").pop().trim();
  }
  return String(q || "").split(",")[0].trim();
}

function preferCity(hotels, cityId) {
  if (!cityId) return hotels;
  const inCity = (hotels || []).filter((h) => Number(h.cityId) === Number(cityId));
  return inCity.length ? inCity : hotels;
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

async function collectCityHotels(q, dest, firstData) {
  let hotels = listHotels(firstData);
  const areas = listAreas(firstData);
  const title = cityTitle(dest, q);
  const cityId = dest && dest.cityId;
  const queries = [];
  const seenQ = new Set([String(q || "").trim().toLowerCase()]);
  function addQ(s) {
    const t = String(s || "").trim();
    if (!t) return;
    const k = t.toLowerCase();
    if (seenQ.has(k)) return;
    seenQ.add(k);
    queries.push(t);
  }
  for (const w of LODGING_WORDS) addQ(title + " " + w);
  for (const a of areas.slice(0, MAX_AREA_QUERIES)) {
    const an = String(a.label || "").split(",")[0].trim();
    addQ(an + " hotel");
  }
  const extra = queries.slice(0, MAX_HOTEL_QUERIES);
  const results = await Promise.all(extra.map((qq) => fetchAgoda(qq).catch(() => null)));
  for (const data of results) {
    if (!data) continue;
    hotels = mergeHotels(hotels, listHotels(data));
  }
  return preferCity(hotels, cityId);
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

export async function GET(request) {
  const req = new URL(request.url);
  const q = (req.searchParams.get("q") || "").trim();
  const wantHotels = req.searchParams.get("hotels") === "1";
  const cityIdParam = num(req.searchParams.get("cityId"));
  if (q.length < 2) return Response.json({ dest: null, suggestions: [], hotels: [] });
  try {
    const data = await fetchAgoda(q);
    if (!data) return Response.json({ dest: null, suggestions: [], hotels: [] });
    const suggestions = listSuggest(data);
    const dest = pickDest(data, suggestions);
    if (dest && cityIdParam && !dest.cityId) dest.cityId = cityIdParam;
    let hotels;
    if (wantHotels) {
      hotels = await collectCityHotels(q, dest, data);
    } else {
      hotels = preferCity(listHotels(data), dest && dest.cityId);
    }
    return Response.json({
      dest,
      suggestions,
      hotels,
      source: "agoda-suggest"
    });
  } catch (e) {
    return Response.json({ dest: null, suggestions: [], hotels: [] });
  }
}
