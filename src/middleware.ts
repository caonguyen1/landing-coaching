import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('admin_token')?.value;
  const path = req.nextUrl.pathname;


  if (path === '/login') {
    return NextResponse.next();
  }

  // 🔒 chặn admin
  if (path.startsWith('/admin')) {
    if (token !== process.env.ADMIN_SECRET) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};