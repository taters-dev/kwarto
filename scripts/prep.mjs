import { mkdirSync, writeFileSync, readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

mkdirSync("public", { recursive: true });

const cacheBust = "hotels8";
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
const homeCebu = destHrefs.filter((h) => /cebu(\.html)?/i.test(h) && h.indexOf("agoda.com") === -1 && h.indexOf("klook.com") === -1);
if (destHrefs.length !== 22 || homeCebu.length !== 1) {
  console.error("prep abort: need 1 Cebu local card among 22 dest-cards");
  process.exit(1);
}
if (index.includes("v=hotels2") || index.includes("v=hotels3") || index.includes("v=hotels4")) {
  console.error("prep abort: cacheBust rewrote back to old hotels cache");
  process.exit(1);
}
if ((cebu.match(/class="dest-card"/g) || []).length !== 8) {
  console.error("prep abort: cebu.html needs 8 hotel dest-cards");
  process.exit(1);
}
if ((cebu.match(/class="hotel-pill"/g) || []).length !== 16) {
  console.error("prep abort: cebu.html needs 16 hotel pills (8 x 2 Klook+KKday)");
  process.exit(1);
}
if ((cebu.match(/data-provider="klook"/g) || []).length !== 8 || (cebu.match(/data-provider="kkday"/g) || []).length !== 8) {
  console.error("prep abort: cebu.html pills must be Klook and KKday only");
  process.exit(1);
}
if (cebu.includes("Agoda") || cebu.includes("Trip.com") || cebu.includes("Expedia") || cebu.includes('data-provider="agoda"') || cebu.includes('data-provider="trip"') || cebu.includes('data-provider="expedia"')) {
  console.error("prep abort: Agoda/Trip/Expedia pills must be removed from cebu.html");
  process.exit(1);
}
if (!cebu.includes("Shangri-La Mactan") || !cebu.includes("Marco Polo Plaza") || !cebu.includes('data-hotel-name="Shangri-La Mactan"') || !cebu.includes('data-hotel-name="Marco Polo Plaza"')) {
  console.error("prep abort: Cebu hotel names missing on pills");
  process.exit(1);
}
if (!cebu.includes("Two partners") || cebu.includes("Three partners")) {
  console.error("prep abort: Cebu copy must say Two partners");
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
if (!cssOut.includes(".hotel-pill") || !cssOut.includes("1px solid #0038A8") || !cssOut.includes("grid-template-columns: 1fr 1fr")) {
  console.error("prep abort: hotel pill CSS missing");
  process.exit(1);
}
if (cssOut.includes("grid-template-columns: 1fr 1fr 1fr")) {
  console.error("prep abort: hotel pills must be two columns, not three");
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
if (!cebu.includes('class="hotel-list"') || cebu.includes('class="dest-grid"')) {
  console.error("prep abort: cebu hotels must be hotel-list not dest-grid");
  process.exit(1);
}
if (!cssOut.includes(".hotel-list") || !/\.hotel-list\s*\{[^}]*grid-template-columns:\s*1fr/s.test(cssOut)) {
  console.error("prep abort: hotel-list stacked CSS missing");
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
if (!appjs.includes("function destNow(typed)") || !appjs.includes("location.href = cebuListHref()") || !appjs.includes("function isCebuLocal")) {
  console.error("prep abort: Find My Hotel must navigate to cebu.html for Cebu");
  process.exit(1);
}
if (!appjs.includes("function resultsListHref") || !appjs.includes("location.href = resultsListHref") || !appjs.includes("results.html")) {
  console.error("prep abort: Find My Hotel must stay on Kwarto results for non-Cebu");
  process.exit(1);
}
const submitChunk = appjs.slice(appjs.indexOf('searchForm.addEventListener("submit"'), appjs.indexOf("function destCardQuery"));
if (!submitChunk || submitChunk.includes("window.open")) {
  console.error("prep abort: Find My Hotel must not open a partner tab");
  process.exit(1);
}
if (!appjs.includes("function fillResults") || !appjs.includes("function bindHotelCards") || !appjs.includes("data-results-list") || !appjs.includes("j.hotels") || !appjs.includes("CITY_HOTELS") || !appjs.includes("function curatedHotels")) {
  console.error("prep abort: results hotel-list renderer missing");
  process.exit(1);
}
if (!results.includes("Kwarto") || !results.includes('class="hotel-list"') || !results.includes("data-results-list") || !results.includes("data-hotel-count")) {
  console.error("prep abort: results.html must be a Kwarto hotel list");
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
if (!appjs.includes("www.kkday.com/en/hotels") || !appjs.includes("function kkdayWrap") || !appjs.includes("campaign_id")) {
  console.error("prep abort: KKday wrap missing");
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

if (!appjs.includes("function bindHotelPills()") || !appjs.includes("data-provider") || !appjs.includes('provider === "klook"') || !appjs.includes('provider === "kkday"')) {
  console.error("prep abort: hotel pill URL binders missing for klook/kkday");
  process.exit(1);
}
if (!appjs.includes("function bindCebuCard()") || !appjs.includes("cebu.html")) {
  console.error("prep abort: Cebu dest-card must keep local hotel list href");
  process.exit(1);
}
if (!appjs.includes("function bindDestCards()") || !appjs.includes('addEventListener("change", bindDestCards)')) {
  console.error("prep abort: dest-cards must refresh Klook dates with the search");
  process.exit(1);
}
if (!appjs.includes("function destCardQuery") || !appjs.includes("a.dest-card")) {
  console.error("prep abort: dest-card Klook click-out binder missing");
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
console.log("prep ok", "cacheBust", cacheBust);
