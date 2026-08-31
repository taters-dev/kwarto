export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// Official city inventory (name, image, live rate, deep link) needs Klook and
// KKday hotel API credentials. Those are not in this repo. Do not invent names
// or PHP prices. When keys exist, map city → partner dest and return cards:
// { name, image, price, currency, provider, deepLink }.

function hasKey(...names) {
  return names.some((n) => {
    const v = process.env[n];
    return typeof v === "string" && v.trim().length > 0;
  });
}

export async function GET(request) {
  const req = new URL(request.url);
  const city = (req.searchParams.get("city") || "").trim();
  const klook = hasKey("KLOOK_API_KEY", "KLOOK_AFFILIATE_KEY");
  const kkday = hasKey("KKDAY_API_KEY", "KKDAY_AUTHOR_TOKEN");
  return Response.json({
    city,
    hotels: [],
    source: "none",
    ready: false,
    providers: {
      klook: klook ? "configured" : "missing",
      kkday: kkday ? "configured" : "missing",
    },
    message: "No official Klook/KKday hotel feed is wired. City pages stay empty until partner API access exists.",
  });
}
