import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const isAuthed = request.cookies.get('isAuthed')?.value;

  if (request.nextUrl.pathname.startsWith('/projects') && isAuthed !== 'true') {

    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/projects/:path*'], 
};