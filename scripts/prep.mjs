import { mkdirSync, writeFileSync, readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

mkdirSync("public", { recursive: true });

const cacheBust = "hotels11";
const need = ["index.html", "cebu.html", "hotel.html", "results.html", "cal.js", "guests.js", "app.js", "styles.css"];

function applyCacheBust(html) {
  return html
    .replace(/\/?styles\.css\?v=[^"'\s>]+/g, `/styles.css?v=${cacheBust}`)
    .replace(/\/?cal\.js\?v=[^"'\s>]+/g, `/cal.js?v=${cacheBust}`)
    .replace(/\/?guests\.js\?v=[^"'\s>]+/g, `/guests.js?v=${cacheBust}`)
    .replace(/\/?app\.js\?v=[^"'\s>]+/g, `/app.js?v=${cacheBust}`);
}

for (const name of need) {
  if (!existsSync(name)) {
    console.error("prep abort: missing local", name);
    process.exit(1);
  }
  const buf = readFileSync(name);
  if (!buf.length) {
    console.error("prep abort: empty local", name);
    process.exit(1);
  }
  let out = buf;
  if (name.endsWith(".html")) {
    out = Buffer.from(applyCacheBust(buf.toString("utf8")), "utf8");
  }
  writeFileSync(join("public", name), out);
  console.log("prep copy", name, out.length);
}

const index = readFileSync(join("public", "index.html"), "utf8");
const appjs = readFileSync(join("public", "app.js"), "utf8");
const cssOut = readFileSync(join("public", "styles.css"), "utf8");
const guests = readFileSync(join("public", "guests.js"), "utf8");

if (index.length < 1000 || !index.includes("Kwarto") || !index.includes("guest-root") || !/body class="nc"/.test(index)) {
  console.error("prep abort: index.html is placeholder or not the hotel page");
  process.exit(1);
}
if (!index.includes("<br>Stress-free booking.")) {
  console.error("prep abort: two-line subline missing");
  process.exit(1);
}
if (index.includes('class="nc-nearby"')) {
  console.error("prep abort: Nearby Hotels link still under the search form");
  process.exit(1);
}
const cebu = readFileSync(join("public", "cebu.html"), "utf8");
const results = readFileSync(join("public", "results.html"), "utf8");
const hotel = readFileSync(join("public", "hotel.html"), "utf8");
if (hotel.includes("Agoda") || hotel.includes("agoda.com") || !hotel.includes("Continue on Klook") || !hotel.includes('data-hotel-name="Coral House Mactan"')) {
  console.error("prep abort: hotel.html must continue on Klook, not Agoda");
  process.exit(1);
}
if (!index.includes(`href="/styles.css?v=${cacheBust}"`) || (index.match(/class="dest-card"/g) || []).length !== 22) {
  console.error("prep abort: cache-bust or need 22 city dest-cards");
  process.exit(1);
}
if (!index.includes("Hotels in Cebu") || !index.includes("Hotels in Boracay") || !index.includes("Hotels in Siargao") || !index.includes("Hotels in Legazpi")) {
  console.error("prep abort: city dest-cards missing");
  process.exit(1);
}
if (index.includes("hotel-pill") || index.includes("hotel-pills") || index.includes("Shangri-La Mactan")) {
  console.error("prep abort: hotel pills/names must not be on homepage");
  process.exit(1);
}
if (!/href="(?:\/)?cebu(?:\.html)?(?:\?[^"]*)?"/.test(index)) {
  console.error("prep abort: Cebu card must go to cebu.html or /cebu");
  process.exit(1);
}
if (index.includes("agoda.com") || /cid=0/.test(index)) {
  console.error("prep abort: homepage dest-cards must not be Agoda cid=0");
  process.exit(1);
}
if (index.includes("data-usd") || /<p class="from">/.test(index) || index.includes("\u20b1")) {
  console.error("prep abort: fake PHP prices still on homepage");
  process.exit(1);
}
const destHrefs = [...index.matchAll(/<a class="dest-card"[^>]*href="([^"]+)"/g)].map((m) => m[1]);
if (destHrefs.length !== 22) {
  console.error("prep abort: need 22 dest-cards");
  process.exit(1);
}
if (destHrefs.some((h) => h === "#" || h.includes("agoda.com") || h.includes("klook.com") || h.includes("tp.media"))) {
  console.error("prep abort: dest-cards must stay on Kwarto city pages");
  process.exit(1);
}
if (!destHrefs.every((h) => /^\/[a-z0-9-]+(?:\?[^"]*)?$/.test(h) || /cebu(\.html)?/i.test(h))) {
  console.error("prep abort: dest-cards must use clean city URLs");
  process.exit(1);
}
if (!destHrefs.some((h) => /\/cebu(?:\?|$)/i.test(h) || /cebu\.html/i.test(h))) {
  console.error("prep abort: Cebu card must go to /cebu");
  process.exit(1);
}
if (!destHrefs.some((h) => /\/manila(?:\?|$)/i.test(h)) || !destHrefs.some((h) => /\/boracay(?:\?|$)/i.test(h))) {
  console.error("prep abort: Manila and Boracay cards must go to city pages");
  process.exit(1);
}
if (index.includes("v=hotels2") || index.includes("v=hotels3") || index.includes("v=hotels4") || index.includes("v=hotels8") || index.includes("v=hotels9")) {
  console.error("prep abort: cacheBust rewrote back to old hotels cache");
  process.exit(1);
}
if ((cebu.match(/class="dest-card"/g) || []).length) {
  console.error("prep abort: cebu.html must not ship a fake hotel catalog");
  process.exit(1);
}
if (cebu.includes("Shangri-La Mactan") || cebu.includes("Marco Polo Plaza") || cebu.includes("Coral House")) {
  console.error("prep abort: placeholder hotel names must not be on cebu.html");
  process.exit(1);
}
if (cebu.includes("hotel-pill") || cebu.includes("hotel-pills") || cebu.includes("data-provider") || cebu.includes("KKday") || cebu.includes("kkday")) {
  console.error("prep abort: partner pills must be gone; Klook is the only click-out");
  process.exit(1);
}
if (cebu.includes("Agoda") || cebu.includes("Trip.com") || cebu.includes("Expedia")) {
  console.error("prep abort: other OTAs must be removed from cebu.html");
  process.exit(1);
}
if (!cebu.includes("book on Klook") || cebu.includes("Two partners") || cebu.includes("Three partners") || cebu.includes("Book on Klook.")) {
  console.error("prep abort: Cebu copy must send hotels to Klook");
  process.exit(1);
}
if (cebu.includes("Coral House") || /class="dest-card"[\s\S]{0,400}data-usd=/.test(cebu)) {
  console.error("prep abort: fake hotels or prices on cebu dest-cards");
  process.exit(1);
}
if (index.includes("Find My Hotel") && /dest-card[\s\S]{0,400}Find My Hotel/.test(index)) {
  console.error("prep abort: Find My Hotel on dest card");
  process.exit(1);
}
if (index.includes("v=search6")) {
  console.error("prep abort: cacheBust rewrote back to search6");
  process.exit(1);
}
if (index.includes("v=guest3") || index.includes("v=guest4")) {
  console.error("prep abort: cacheBust rewrote back to guest cache");
  process.exit(1);
}
if (!index.includes('src="/cal.js?v=') || !index.includes('src="/guests.js?v=') || !index.includes('src="/app.js?v=')) {
  console.error("prep abort: homepage scripts must be root-absolute");
  process.exit(1);
}
if (!index.includes("kwarto-wordmark.png") || !index.includes('id="typeahead"')) {
  console.error("prep abort: wordmark or typeahead missing");
  process.exit(1);
}
if (!index.includes("Adults:") || !index.includes("Children:") || !index.includes("Get the best price for your needs")) {
  console.error("prep abort: guest picker structure missing");
  process.exit(1);
}
if (appjs.length < 10000) {
  console.error("prep abort: app.js too small (stub/minified)", appjs.length);
  process.exit(1);
}
if (cssOut.length < 10000) {
  console.error("prep abort: styles.css too small (stub)", cssOut.length);
  process.exit(1);
}
if (appjs.trimStart().startsWith("!function") || cssOut.trimStart().startsWith(":root{--paper")) {
  console.error("prep abort: JS/CSS looks minified; do not minify");
  process.exit(1);
}
if (cssOut.length < 1000 || cssOut.trimStart().toLowerCase().startsWith("<!doctype") || !cssOut.includes(":root") || !cssOut.includes("#0038A8") || !cssOut.includes(".typeahead")) {
  console.error("prep abort: styles.css missing or not real CSS");
  process.exit(1);
}
if (!cssOut.includes(".guest-age-select") || !cssOut.includes("border: 2px solid #0038A8")) {
  console.error("prep abort: guest picker CSS missing");
  process.exit(1);
}
if (!cssOut.includes(".guest-age-list") || !cssOut.includes(".guest-age-opt") || !/\.guest-ages\s*\{[^}]*grid-template-columns:\s*1fr 1fr/s.test(cssOut)) {
  console.error("prep abort: two-up age rows or custom list CSS missing");
  process.exit(1);
}
if (cssOut.includes(".hotel-pill") || cssOut.includes(".hotel-pills")) {
  console.error("prep abort: hotel pill CSS must be removed");
  process.exit(1);
}
if (/\.nc-trips \.dest-grid\s*\{[^}]*overflow-x:\s*auto/s.test(cssOut)) {
  console.error("prep abort: carousel CSS must not apply to all nc-trips dest-grids");
  process.exit(1);
}
if (!cssOut.includes("#destinations .dest-grid") || !/#destinations \.dest-grid\s*\{[^}]*overflow-x:\s*auto/s.test(cssOut)) {
  console.error("prep abort: homepage dest rail carousel missing");
  process.exit(1);
}
if (!cebu.includes('class="hotel-list"') || !cebu.includes("data-results-list") || !cebu.includes("data-hotel-pager") || cebu.includes('class="dest-grid"')) {
  console.error("prep abort: cebu hotels must be hotel-list not dest-grid");
  process.exit(1);
}
if (!cssOut.includes(".hotel-list") || !/\.hotel-list\s*\{[^}]*grid-template-columns:\s*1fr/s.test(cssOut) || !cssOut.includes(".hotel-pager") || !cssOut.includes(".hotel-page-status") || !cssOut.includes(".hotel-empty")) {
  console.error("prep abort: hotel-list stacked CSS, pager, or empty-city CSS missing");
  process.exit(1);
}
if (/\.hotel-list\s*\{[^}]*overflow-x:\s*auto/s.test(cssOut)) {
  console.error("prep abort: hotel-list must not be a horizontal scroller");
  process.exit(1);
}
if (!appjs.includes("/api/dest?q=") || appjs.includes('kind: "text", text: typed') || appjs.includes('searchParams.set("text"')) {
  console.error("prep abort: typeahead dest resolve missing");
  process.exit(1);
}
if (!appjs.includes("if (visibleRows[0]) choose(visibleRows[0])")) {
  console.error("prep abort: typeahead Enter does not choose row");
  process.exit(1);
}
if (appjs.includes("Nearby Hotels")) {
  console.error("prep abort: Nearby Hotels still in app.js");
  process.exit(1);
}
if (!appjs.includes('typeahead.addEventListener("click", onRowActivate)')) {
  console.error("prep abort: typeahead row click/tap does not choose");
  process.exit(1);
}
if (!appjs.includes('typeahead.addEventListener("touchend", onRowActivate')) {
  console.error("prep abort: typeahead row touchend does not choose");
  process.exit(1);
}
if (appjs.includes("resolveTyped(typed).then(go)")) {
  console.error("prep abort: submit window.open is after await (popup-blocked)");
  process.exit(1);
}
if (!appjs.includes("function destNow(typed)") || !appjs.includes("function cityPageHref") || !appjs.includes("location.href = cityPageHref") || !appjs.includes("function isCebuLocal")) {
  console.error("prep abort: Find My Hotel must navigate to a Kwarto city page");
  process.exit(1);
}
if (appjs.includes("function resultsListHref") || appjs.includes("location.href = resultsListHref") || appjs.includes("results.html\"")) {
  console.error("prep abort: non-Cebu search must use city URLs, not results.html");
  process.exit(1);
}
const submitChunk = appjs.slice(appjs.indexOf('searchForm.addEventListener("submit"'), appjs.indexOf("function destCardQuery"));
if (!submitChunk || submitChunk.includes("window.open")) {
  console.error("prep abort: Find My Hotel must not open a partner tab");
  process.exit(1);
}
if (!appjs.includes("function fillResults") || !appjs.includes("function bindHotelCards") || !appjs.includes("data-results-list") || !appjs.includes("j.hotels") || !appjs.includes("HOTEL_PAGE_SIZE") || !appjs.includes("function paintHotelPage") || !appjs.includes("function bindHotelPager")) {
  console.error("prep abort: results hotel-list renderer or pagination missing");
  process.exit(1);
}
if (appjs.includes("CITY_HOTELS") || appjs.includes("function curatedHotels")) {
  console.error("prep abort: curated hotel-name lists must not drive results");
  process.exit(1);
}
if (!results.includes("Kwarto") || !results.includes('class="hotel-list"') || !results.includes("data-results-list") || !results.includes("data-hotel-count") || !results.includes("data-hotel-pager") || !results.includes("data-page-next") || !results.includes("data-city-page") || !results.includes("book on Klook")) {
  console.error("prep abort: results.html must be a Kwarto city hotel list with pager");
  process.exit(1);
}
if (results.includes("Two partners") || results.includes("KKday") || results.includes("kkday") || results.includes("kwarto-wm.vercel.app")) {
  console.error("prep abort: results.html must be Klook-only with the local wordmark");
  process.exit(1);
}
if (results.includes("data-usd") || results.includes("\u20b1") || results.includes("agoda.com") || results.includes('class="dest-grid"')) {
  console.error("prep abort: results.html must not have fake prices, Agoda, or dest-grid");
  process.exit(1);
}
if (!results.includes('src="/cal.js?v=') || !results.includes('src="/guests.js?v=') || !results.includes('src="/app.js?v=')) {
  console.error("prep abort: results.html scripts must be root-absolute");
  process.exit(1);
}
if (!appjs.includes("function tpWrap") || !appjs.includes("tp.media") || !appjs.includes("www.klook.com/hotels/") || !appjs.includes("function klookWrap") || !appjs.includes("window.open(klookWrap(")) {
  console.error("prep abort: app.js must contain klook wrap");
  process.exit(1);
}
if (appjs.includes("kkday") || appjs.includes("kkday.com") || appjs.includes("function kkdayWrap")) {
  console.error("prep abort: KKday wrap must be removed; KKday has no PH inventory");
  process.exit(1);
}
if (!appjs.includes("campaign_id")) {
  console.error("prep abort: travelpayouts wrap missing");
  process.exit(1);
}
if (appjs.includes("agodaUrl") || (appjs.includes("cid=0") && appjs.includes("www.agoda.com/search"))) {
  console.error("prep abort: Agoda click-out must not be live");
  process.exit(1);
}
const chooseChunk = appjs.slice(appjs.indexOf("function choose(row)"), appjs.indexOf("function renderTypeahead"));
if (chooseChunk.includes("window.open") || chooseChunk.includes("location.href")) {
  console.error("prep abort: typeahead choose() navigates");
  process.exit(1);
}

if (appjs.includes("bindHotelPills") || appjs.includes("pillHref") || appjs.includes("hotel-pill") || appjs.includes("data-provider")) {
  console.error("prep abort: hotel pill binders must be removed");
  process.exit(1);
}
if (!appjs.includes('data-hotel-name') || !appjs.includes("function destCardQuery")) {
  console.error("prep abort: dest-card binder must send hotel cards to Klook");
  process.exit(1);
}
if (!appjs.includes("function bindCebuCard()") || !appjs.includes("function destSlug") || !appjs.includes('slug: "cebu"')) {
  console.error("prep abort: dest-cards must keep local city-page hrefs");
  process.exit(1);
}
if (!appjs.includes("function bindDestCards()") || !appjs.includes('addEventListener("change", bindDestCards)')) {
  console.error("prep abort: dest-cards must refresh city-page dates with the search");
  process.exit(1);
}
if (!appjs.includes("function destCardQuery") || !appjs.includes("a.dest-card") || !appjs.includes("function destCardSlug")) {
  console.error("prep abort: dest-card city-page binder missing");
  process.exit(1);
}
if (appjs.includes("a.href = klookWrap(q)")) {
  console.error("prep abort: dest-cards must not click out to Klook");
  process.exit(1);
}
if (!guests.includes("Child ") || !guests.includes("Under 1") || guests.length < 1000) {
  console.error("prep abort: guests.js missing or empty");
  process.exit(1);
}
if (guests.includes("<select") || guests.includes("tagName !== \"SELECT\"") || guests.includes("age-pick")) {
  console.error("prep abort: ages must not use native select or a second sheet");
  process.exit(1);
}
if (!guests.includes("guest-age-list") || !guests.includes("Child ") || !guests.includes(" Age")) {
  console.error("prep abort: custom age list under the field missing");
  process.exit(1);
}
const destRoute = existsSync("app/api/dest/route.js") ? readFileSync("app/api/dest/route.js", "utf8") : "";
if (!destRoute.includes("GetUnifiedSuggestResult") || !destRoute.includes("hotels: []") || destRoute.includes("function collectCityHotels") || destRoute.includes("LODGING_WORDS")) {
  console.error("prep abort: dest API is typeahead only — must not collect Agoda hotel lists");
  process.exit(1);
}
if (!destRoute.includes("SUGGEST_CAP") || !destRoute.includes("if (out.length >= SUGGEST_CAP)")) {
  console.error("prep abort: typeahead suggestions must stay capped");
  process.exit(1);
}
const hotelsRoute = existsSync("app/api/hotels/route.js") ? readFileSync("app/api/hotels/route.js", "utf8") : "";
const isEmptyStub = hotelsRoute.includes("hotels: []") && hotelsRoute.includes("source: \"none\"");
const isRapidAPI = hotelsRoute.includes("RAPIDAPI_KEY") && hotelsRoute.includes("rapidapi.com");
if (!isEmptyStub && !isRapidAPI) {
  console.error("prep abort: /api/hotels must be an empty partner stub or RapidAPI integration");
  process.exit(1);
}
if (hotelsRoute.includes("GetUnifiedSuggestResult") || hotelsRoute.includes("agoda.com")) {
  console.error("prep abort: /api/hotels must not use Agoda");
  process.exit(1);
}
if (appjs.includes("/api/dest?q=") && appjs.includes("extra.hotels") && appjs.includes("fetchSuggest(q, null, extra)")) {
  console.error("prep abort: city hotel list must not load Agoda dest hotels");
  process.exit(1);
}
if (!appjs.includes("/api/hotels?city=") || !appjs.includes("function fetchHotels") || !appjs.includes("function renderEmptyCity")) {
  console.error("prep abort: city pages must load /api/hotels and show an honest empty state");
  process.exit(1);
}
if (appjs.includes("kind: \"agoda\"")) {
  console.error("prep abort: DEST cities must not be Agoda-kind");
  process.exit(1);
}
const nextConfig = existsSync("next.config.js") ? readFileSync("next.config.js", "utf8") : "";
const mid = existsSync("middleware.js") ? readFileSync("middleware.js", "utf8") : "";
if (!nextConfig.includes('source: "/:city"') || !nextConfig.includes('destination: "/results.html"')) {
  console.error("prep abort: next.config must rewrite /:city to results.html");
  process.exit(1);
}
if (!mid.includes("/results.html") || !mid.includes("RESERVED")) {
  console.error("prep abort: middleware must rewrite city slugs to the city template");
  process.exit(1);
}
console.log("prep ok", "cacheBust", cacheBust);
