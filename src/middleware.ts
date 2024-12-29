import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

export function middleware() {
  // const token = request.cookies.get('token')?.value;
  // const admin = request.cookies.get('admin')?.value;

  // if (
  //   token &&
  //   (request.nextUrl.pathname === '/login' ||
  //     request.nextUrl.pathname === '/login/register')
  // ) {
  //   return NextResponse.redirect(new URL('/', request.url));
  // }

  // if (
  //   !token &&
  //   ['/protected', '/book', '/user'].some((path) =>
  //     request.nextUrl.pathname.startsWith(path)
  //   )
  // ) {
  //   return NextResponse.redirect(new URL('/login', request.url));
  // }

  // if (!admin && request.nextUrl.pathname.startsWith('/admin')) {
  //   return NextResponse.redirect(new URL('/login', request.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/login',
    '/login/register',
    '/protected/:path*',
    '/book/:path*',
    '/user/:path*',
    '/admin/:path*',
  ],
};
