import { NextResponse } from "next/server";

/** City slugs like /cebu, /manila, /tokyo — not reserved paths. */
const RESERVED = new Set([
  "api",
  "hotel",
  "results",
  "cebu.html",
  "index.html",
  "hotel.html",
  "results.html",
  "styles.css",
  "app.js",
  "cal.js",
  "guests.js",
  "favicon.ico",
  "robots.txt",
  "sitemap.xml",
  "brand",
]);

function isCitySlug(pathname) {
  const slug = pathname.replace(/^\/+|\/+$/g, "").toLowerCase();
  if (!slug || slug.includes("/") || slug.includes(".")) return false;
  if (RESERVED.has(slug)) return false;
  return /^[a-z0-9][a-z0-9-]{0,62}$/.test(slug);
}

export function middleware(request) {
  const { pathname } = request.nextUrl;
  if (pathname === "/") {
    return NextResponse.rewrite(new URL("/index.html", request.url));
  }
  if (pathname === "/hotel") {
    return NextResponse.rewrite(new URL("/hotel.html", request.url));
  }
  if (pathname === "/results") {
    return NextResponse.rewrite(new URL("/results.html", request.url));
  }
  if (isCitySlug(pathname)) {
    return NextResponse.rewrite(new URL("/results.html", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/((?!api/|_next/|styles\\.css|app\\.js|cal\\.js|guests\\.js).*)"],
};
