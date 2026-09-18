import {
  isAvailableOnBooking,
  isSoldOut,
  nightsBetween,
  parseYmd,
  pricePerNightUSD
} from "../app/lib/booking-availability.js";

function assert(cond, msg) {
  if (!cond) {
    console.error("fail:", msg);
    process.exit(1);
  }
}

assert(parseYmd("2026-09-12") === "2026-09-12", "parse valid ymd");
assert(parseYmd("nope") === "", "reject bad ymd");
assert(nightsBetween("2026-09-12", "2026-09-15") === 3, "3-night stay");
assert(nightsBetween("2026-09-12", "2026-09-12") === 1, "same-day falls back to 1");

const priced = {
  type: "property_card",
  hotel_id: 1,
  composite_price_breakdown: { gross_amount_per_night: { value: 89.4 } }
};
assert(isAvailableOnBooking(priced, 3) === true, "priced hotel is available");
assert(pricePerNightUSD(priced, 3) === 89, "round per-night price");

const sold = {
  type: "property_card",
  hotel_id: 2,
  soldout: 1,
  composite_price_breakdown: { gross_amount_per_night: { value: 40 } }
};
assert(isSoldOut(sold) === true, "soldout flag");
assert(isAvailableOnBooking(sold, 3) === false, "sold-out hotel hidden");

const noPrice = { type: "property_card", hotel_id: 3 };
assert(isAvailableOnBooking(noPrice, 3) === false, "no price means unavailable");

const totalOnly = {
  type: "property_card",
  hotel_id: 4,
  composite_price_breakdown: { gross_amount: { value: 300 } }
};
assert(pricePerNightUSD(totalOnly, 3) === 100, "split stay total across nights");
assert(isAvailableOnBooking(totalOnly, 3) === true, "total-only price is bookable");

const ad = {
  type: "ad_card",
  hotel_id: 5,
  composite_price_breakdown: { gross_amount_per_night: { value: 10 } }
};
assert(isAvailableOnBooking(ad, 1) === false, "non-property cards excluded");

console.log("availability helpers ok");
