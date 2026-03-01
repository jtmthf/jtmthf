import Negotiator from 'negotiator';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const SUPPORTED_MEDIA_TYPES = ['text/html', 'text/markdown'];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/posts/')) {
    const headers = Object.fromEntries(request.headers.entries());
    const negotiator = new Negotiator({ headers });
    const preferredMediaType = negotiator.mediaType(SUPPORTED_MEDIA_TYPES);

    if (preferredMediaType !== 'text/markdown') {
      return NextResponse.next();
    }

    const slug = pathname.replace(/^\/posts\//, '').replace(/\/$/, '');
    return NextResponse.rewrite(new URL(`/api/markdown/${slug}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    {
      source:
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|monitoring).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
};
