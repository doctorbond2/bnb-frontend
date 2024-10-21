import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token');
  const admin = request.cookies.get('admin');
  const protectedRoutes = ['/protected', '/book', '/another-protected-route'];
  console.log('token:', token);

  if (token) {
    if (
      request.nextUrl.pathname === '/login' ||
      request.nextUrl.pathname === '/login/register'
    ) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  if (
    !token &&
    protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route))
  ) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (!admin && request.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/login', '/login/register', '/protected/:path*', '/book/:path*'],
};
