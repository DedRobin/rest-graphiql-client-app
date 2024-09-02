import { NextRequest } from "next/server";
import { authMiddleware, redirectToLogin } from "next-firebase-auth-edge";
import { clientConfig, serverConfig } from "./services/firebase";
import { Route } from "./app/routes";

export async function middleware(request: NextRequest) {
  return authMiddleware(request, {
    loginPath: "/api/login",
    logoutPath: "/api/logout",
    apiKey: clientConfig.apiKey,
    cookieName: serverConfig.cookieName,
    cookieSignatureKeys: serverConfig.cookieSignatureKeys,
    cookieSerializeOptions: serverConfig.cookieSerializeOptions,
    serviceAccount: serverConfig.serviceAccount,
    handleInvalidToken: async (reason) => {
      console.info("Missing or malformed credentials", { reason });

      return redirectToLogin(request, {
        path: Route.Login,
        publicPaths: [Route.Login, Route.Registration, Route.Main],
      });
    },
  });
}

export const config = {
  matcher: [
    "/api/login",
    "/api/logout",
    "/((?!_next|favicon.ico|api|.*\\.).*)",
  ],
};
