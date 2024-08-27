import { NextResponse, NextRequest } from "next/server";
import { Route } from "./app/routes";

export function middleware(request: NextRequest) {
//   return NextResponse.redirect(new URL(Route.Login, request.url));
}

export const config = {
  matcher: ["/graphiql/:path*", "/restfull/:path*", "/history/:path*"],
};
