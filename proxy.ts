import { NextRequest, NextResponse } from "next/server";

const authPages = [
  "/sign-in",
  "/sign-up",
  "/forgot-password",
  "/reset-password",
];

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const accessToken = req.cookies.get("access_token")?.value;

  // 🚫 Not authenticated → protect dashboard
  if (!accessToken && pathname.startsWith("/dashboard")) {
    const signInUrl = new URL("/sign-in", req.url);
    signInUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(signInUrl);
  }

  // 🚫 Authenticated → block auth pages
  if (accessToken && authPages.includes(pathname)) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/sign-in",
    "/sign-up",
    "/forgot-password",
    "/reset-password",
  ],
};
