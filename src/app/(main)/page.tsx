import { notFound } from "next/navigation";
import { Home } from "./client";
import { getTokens } from "next-firebase-auth-edge";
import { cookies } from "next/headers";
import { clientConfig, serverConfig } from "@/services/firebase";

export default async function HomePage() {
  const tokens = await getTokens(cookies(), {
    apiKey: clientConfig.apiKey,
    cookieName: serverConfig.cookieName,
    cookieSignatureKeys: serverConfig.cookieSignatureKeys,
    serviceAccount: serverConfig.serviceAccount,
  });

  // if (!tokens) {
  //   notFound();
  // }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      {" "}
      <h1 className="text-xl mb-4">Super secure home page</h1>{" "}
      <p>
        {" "}
        Only <strong>{tokens?.decodedToken.email}</strong> holds the magic key
        to this kingdom!{" "}
      </p>{" "}
    </main>
  );

  // return <Home />;
}
