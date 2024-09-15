"use client";

import { Pixelify_Sans } from "next/font/google";
import AuthenticatedSidebarNavigation from "@/components/UI/Navigation/AuthenticatedSidebarNavigation";
import UnauthenticatedSidebarNavigation from "@/components/UI/Navigation/UnauthenticatedSidebarNavigation";
import { useAuth } from "@/services/next-firebase-auth-edge/contex";
import localeData from "@/services/locale/lang.json";
import { useLocale } from "@/services/locale/contex";

export const pixelifySans = Pixelify_Sans({
  subsets: ["latin"],
  weight: ["600"],
});

export function Home() {
  const { user } = useAuth();
  const { language } = useLocale();

  return (
    <div className="home grid grid-cols-8 grid-rows-[1fr,auto] gap-6 col-span-8 bg-[url('/main-img.webp')] bg-cover bg-no-repeat bg-center h-full w-full">
      {/* Блок заголовка */}

      <div className="col-span-8 sm:col-start-2 sm:col-span-6 2xl:col-start-3 2xl:col-span-4 flex flex-col justify-end items-end h-full">
        <h1 className="text-left w-full">Rest/</h1>
        <h1 className={`${pixelifySans.className} text-right w-full`}>
          {localeData.home.welcome.h1[language]}
        </h1>
      </div>

      {/* Блок "Welcome" */}
      <div className="flex-container col-span-8 row-start-2 sm:col-span-2 flex flex-col items-start justify-start pt-8 pb-12">
        {user ? (
          <>
            <h3 className="text-lightGray">
              {localeData.home.welcome.label[language]},
              {user.displayName || user.email}
            </h3>
            <h5 className="text-mediumGray">
              {localeData.home.welcome.text.forAuthUser[language]}
            </h5>
          </>
        ) : (
          <>
            <h3 className="text-lightGray">
              {" "}
              {localeData.home.welcome.label[language]}
            </h3>
            <h5 className="text-mediumGray">
              {localeData.home.welcome.text.forNotAuthUser[language]}
            </h5>
          </>
        )}
      </div>

      {/* Выбор между навигациями */}
      <div className="button-container row-span-2 lg:col-span-1 lg:col-start-8  hidden sm:flex flex-col gap-4 items-end justify-center">
        {user ? (
          <AuthenticatedSidebarNavigation />
        ) : (
          <UnauthenticatedSidebarNavigation />
        )}
      </div>
    </div>
  );
}
