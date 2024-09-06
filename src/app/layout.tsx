import type { Metadata } from "next";
import { Space_Mono } from "next/font/google";
import "./globals.css";
import { cookies } from "next/headers";
import { getTokens } from "next-firebase-auth-edge";
import {
  clientConfig,
  serverConfig,
} from "@/services/next-firebase-auth-edge/config";
import ToastProvider from "@/services/react-toastify/provider";
import { AuthProvider } from "@/services/next-firebase-auth-edge/provider";
import { toUser } from "@/services/next-firebase-auth-edge/utils";
import { ExpectedErrorBoundary } from "@/services/error-boundary/ErrorBoundary";
import { LocaleProvider } from "@/services/locale/contex";

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "REST/GraphiQL",
  description: "REST/GraphiQL",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const tokens = await getTokens(cookies(), {
    apiKey: clientConfig.apiKey,
    cookieName: serverConfig.cookieName,
    cookieSignatureKeys: serverConfig.cookieSignatureKeys,
    serviceAccount: serverConfig.serviceAccount,
  });

  const user = tokens ? toUser(tokens) : null;

  return (
    <html lang="en">
      <body className={spaceMono.className}>
        <ExpectedErrorBoundary>
          <LocaleProvider>
            <ToastProvider>
              <AuthProvider user={user}>{children}</AuthProvider>
            </ToastProvider>
          </LocaleProvider>
        </ExpectedErrorBoundary>
      </body>
    </html>
  );
}
