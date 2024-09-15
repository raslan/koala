import { clerkMiddleware } from '@clerk/nextjs/server';
import { NextResponse, NextRequest, NextFetchEvent } from 'next/server';

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};

function handler(_auth: any, request: NextRequest, event: NextFetchEvent) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-url', request.url);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export default clerkMiddleware(handler);
