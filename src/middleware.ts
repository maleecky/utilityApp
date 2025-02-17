import { NextResponse } from "next/server";
import { auth } from "./lib/auth";

export default auth((req) => {
  const isLoggedin = req.auth;

  if (req.nextUrl.pathname === "/") {
    return NextResponse.rewrite(new URL("/home", req.nextUrl.origin));
  }

  if (!isLoggedin) {
    if (
      !req.nextUrl.pathname.includes("/home") &&
      !req.nextUrl.pathname.includes("/auth") &&
      !req.nextUrl.pathname.includes("/about")
    ) {
      const newUrl = new URL("/auth/sign-in", req.nextUrl.origin);
      return Response.redirect(newUrl);
    }
  } else {
    if (req.nextUrl.pathname.includes("/auth")) {
      return Response.redirect(new URL("/home", req.nextUrl.origin));
    }
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
