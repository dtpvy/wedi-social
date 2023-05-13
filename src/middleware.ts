import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

// export default withAuth(
//   (req) => {
//     const user = req.nextauth.token?.user;

//     if (
//       user &&
//       user['isAdmin' as keyof typeof user] &&
//       !req.nextUrl.pathname.startsWith('/admin')
//     ) {
//       return NextResponse.redirect(new URL('/signin', req.url));
//     }

//     if (
//       !req.nextUrl.pathname.startsWith('/admin') ||
//       req.nextUrl.pathname.startsWith('/admin/signin')
//     )
//       return;

//     if (!user || !user['isAdmin' as keyof typeof user]) {
//       return NextResponse.redirect(new URL('/signin', req.url));
//     }
//   },
//   {
//     callbacks: {
//       authorized: ({ token }) => {
//         return !!token;
//       },
//     },
//   }
// );

export const middleware = async (req: NextRequest) => {
  const rawReq: any = req;
  const token = await getToken({ req: rawReq, secret: process.env.NEXTAUTH_SECRET });

  // if (!token) return NextResponse.redirect(`/signin`);
  console.log({ token });
  return NextResponse.redirect(`/signin`);
  // return NextResponse.next();
};

export const config = {
  matcher: ['/feed', '/profile', '/trip', '/admin/((?!signin).*)'],
};
