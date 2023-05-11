import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  (req) => {
    const user = req.nextauth.token?.user;

    if (
      user &&
      user['isAdmin' as keyof typeof user] &&
      !req.nextUrl.pathname.startsWith('/admin')
    ) {
      return NextResponse.redirect(new URL('/signin', req.url));
    }

    if (
      !req.nextUrl.pathname.startsWith('/admin') ||
      req.nextUrl.pathname.startsWith('/admin/signin')
    )
      return;

    if (!user || !user['isAdmin' as keyof typeof user]) {
      return NextResponse.redirect(new URL('/signin', req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: ['/feed', '/profile', '/trip', '/admin/^signin'],
};
