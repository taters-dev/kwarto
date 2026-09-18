function asNumber(v) {
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

function truthyFlag(v) {
  return v === 1 || v === true || v === "1" || v === "true";
}

export function parseYmd(raw) {
  const s = String(raw || "").trim();
  return /^\d{4}-\d{2}-\d{2}$/.test(s) ? s : "";
}

export function nightsBetween(checkIn, checkOut) {
  const a = Date.parse(checkIn + "T00:00:00Z");
  const b = Date.parse(checkOut + "T00:00:00Z");
  if (!Number.isFinite(a) || !Number.isFinite(b) || b <= a) return 1;
  return Math.max(1, Math.round((b - a) / 86400000));
}

export function isSoldOut(hotel) {
  if (!hotel) return true;
  if (truthyFlag(hotel.soldout) || truthyFlag(hotel.is_sold_out) || truthyFlag(hotel.sold_out)) return true;
  if (truthyFlag(hotel.cant_book) || truthyFlag(hotel.is_closed)) return true;
  if (hotel.available_rooms === 0) return true;
  return false;
}

export function pricePerNightUSD(hotel, nights) {
  const stayNights = nights > 0 ? nights : 1;
  const breakdown = hotel && hotel.composite_price_breakdown;
  const perNight = asNumber(breakdown && breakdown.gross_amount_per_night && breakdown.gross_amount_per_night.value);
  if (perNight > 0) return Math.round(perNight);
  const gross = asNumber(breakdown && breakdown.gross_amount && breakdown.gross_amount.value);
  if (gross > 0) return Math.round(gross / stayNights);
  const minTotal = asNumber(hotel && hotel.min_total_price);
  if (minTotal > 0) return Math.round(minTotal / stayNights);
  const allIn = asNumber(hotel && hotel.price_breakdown && hotel.price_breakdown.all_inclusive_price);
  if (allIn > 0) return Math.round(allIn / stayNights);
  return null;
}

export function isAvailableOnBooking(hotel, nights) {
  if (!hotel || !hotel.hotel_id) return false;
  if (hotel.type && hotel.type !== "property_card") return false;
  if (isSoldOut(hotel)) return false;
  return pricePerNightUSD(hotel, nights) != null;
}
