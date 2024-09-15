import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import ToastProvider from "@/services/react-toastify/provider";
import { AuthProvider } from "@/services/next-firebase-auth-edge/provider";
import { getUser } from "@/services/next-firebase-auth-edge/utils";
import { ExpectedErrorBoundary } from "@/services/error-boundary/ErrorBoundary";
import { LocaleProvider } from "@/services/locale/contex";

const ibmPlexMono = IBM_Plex_Mono({
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
  const user = await getUser();

  return (
    <html lang="en">
      <body className={ibmPlexMono.className}>
        <ToastProvider>
          <ExpectedErrorBoundary>
            <LocaleProvider>
              <AuthProvider user={user}>{children}</AuthProvider>
            </LocaleProvider>
          </ExpectedErrorBoundary>
        </ToastProvider>
      </body>
    </html>
  );
}
