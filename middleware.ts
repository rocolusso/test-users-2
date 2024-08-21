import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const protectedRoutes = ['/users'];
const publicRoutes = ['/login', '/signup'];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  // NOTE: typically I preffer to use matchPath from react-router package here
  const isProtectedRoute = protectedRoutes.some((route) => path.match(route));
  const isPublicRoute = publicRoutes.some((route) => path.match(route));

  const token = cookies().get('token');

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/login', req.nextUrl));
  }

  if (
    (isPublicRoute || req.nextUrl.pathname === '/')
      && token
      && !req.nextUrl.pathname.startsWith('/users')
  ) {
    return NextResponse.redirect(new URL('/users', req.nextUrl));
  }

  return NextResponse.next();
}
