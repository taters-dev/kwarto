import { NextResponse } from 'next/server';

const RESERVED = new Set([
  "",
  "api",
  "hotel",
  "hotel.html",
  "results",
  "results.html",
  "index",
  "index.html",
  "cebu.html",
]);

function rewriteTo(request, path) {
  return NextResponse.rewrite(new URL(path, request.url));
}

export function middleware(request) {
  const p = request.nextUrl.pathname;
  if (p === "/" || p === "/index.html") {
    return rewriteTo(request, "/index.html");
  }
  if (p === "/hotel" || p === "/hotel.html") {
    return rewriteTo(request, "/hotel.html");
  }
  if (p === "/results" || p === "/results.html" || p === "/cebu.html") {
    return rewriteTo(request, "/results.html");
  }
  const slug = p.replace(/^\//, "").replace(/\/$/, "");
  if (slug && !slug.includes("/") && !slug.includes(".") && !RESERVED.has(slug)) {
    return rewriteTo(request, "/results.html");
  }
}

export const config = {
  matcher: ["/", "/((?!api/|_next/|styles\\.css|app\\.js|cal\\.js|guests\\.js).*)"],
};
