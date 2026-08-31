import { NextResponse } from 'next/server';
export function middleware(request) {
  const p = request.nextUrl.pathname;
  if (p === '/') {
    return NextResponse.rewrite(new URL('/index.html', request.url));
  }
  if (p === '/cebu') {
    return NextResponse.rewrite(new URL('/cebu.html', request.url));
  }
  if (p === '/hotel') {
    return NextResponse.rewrite(new URL('/hotel.html', request.url));
  }
  if (p === '/results') {
    return NextResponse.rewrite(new URL('/results.html', request.url));
  }
}
export const config = { matcher: ['/', '/cebu', '/hotel', '/results'] };
