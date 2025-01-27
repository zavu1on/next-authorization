import { type NextRequest, NextResponse } from 'next/server';
import { auth, isAuthenticatedRequest } from '@/entities/auth';

export default auth((request: NextRequest) => {
  if (isAuthenticatedRequest(request)) {
    // ...
  } else if (request.nextUrl.pathname !== '/login') {
    return NextResponse.redirect(new URL('/login', request.nextUrl.origin));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
