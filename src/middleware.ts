import { NextRequest, NextResponse } from "next/server";
import {
  authMiddleware,
  redirectToHome,
  redirectToLogin,
} from "next-firebase-auth-edge";
import {
  clientConfig,
  serverConfig,
} from "./services/next-firebase-auth-edge/config";
import { Route } from "./app/routes";

const PUBLIC_PATHS = [Route.Login, Route.Registration];

export async function middleware(request: NextRequest) {
  return authMiddleware(request, {
    loginPath: "/api/login",
    logoutPath: "/api/logout",
    apiKey: clientConfig.apiKey,
    cookieName: serverConfig.cookieName,
    cookieSignatureKeys: serverConfig.cookieSignatureKeys,
    cookieSerializeOptions: serverConfig.cookieSerializeOptions,
    serviceAccount: serverConfig.serviceAccount,
    handleValidToken: async ({}, headers) => {
      if (PUBLIC_PATHS.includes(request.nextUrl.pathname as Route)) {
        return redirectToHome(request);
      }

      return NextResponse.next({
        request: {
          headers,
        },
      });
    },
    handleInvalidToken: async (reason) => {
      if (process.env.NODE_ENV)
        console.info("Missing or malformed credentials", { reason });
      return redirectToLogin(request, {
        path: Route.Main,
        publicPaths: PUBLIC_PATHS.concat(Route.Main),
      });
    },
  });
}

export const config = {
  matcher: [
    "/api/login",
    "/api/logout",
    "/GRAPHQL/:path*",
    "/GET/:path*",
    "/POST/:path*",
    "/PUT/:path*",
    "/PATCH/:path*",
    "/DELETE/:path*",
    "/HEAD/:path*",
    "/OPTIONS/:path*",
    "/TRACE/:path*",
    "/history",
  ],
};
