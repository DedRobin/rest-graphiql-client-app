import Login from "./client";
import { cookies } from "next/headers";
import { getTokens } from "next-firebase-auth-edge";
import {
  clientConfig,
  serverConfig,
} from "@/services/next-firebase-auth-edge/config";
import { toUser } from "@/services/next-firebase-auth-edge/utils";

export default async function LoginPage() {
  const tokens = await getTokens(cookies(), {
    apiKey: clientConfig.apiKey,
    cookieName: serverConfig.cookieName,
    cookieSignatureKeys: serverConfig.cookieSignatureKeys,
    serviceAccount: serverConfig.serviceAccount,
  });

  const user = tokens ? toUser(tokens) : null;

  return <Login user={user} />;
}
