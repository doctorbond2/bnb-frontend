import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token');
  console.log('token:', token);

  if (token) {
    if (
      request.nextUrl.pathname === '/login' ||
      request.nextUrl.pathname === '/login/register'
    ) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  if (!token && request.nextUrl.pathname.startsWith('/protected')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/login', '/login/register', '/protected/:path*'],
};
