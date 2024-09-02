"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Route } from "@/app/routes";

export default function UnauthenticatedSidebarNavigation() {
  const pathname = usePathname();

  const isActive = (route: string) => pathname === route;

  return (
    <>
      <Link
        href={Route.Main}
        className={`text-h6 font-h6 leading-h6 tracking-h6 ${
          isActive(Route.Main) ? "text-lightGray" : ""
        }`}
      >
        Main
      </Link>
      <Link
        href={Route.Login}
        className={`text-h6 font-h6 leading-h6 tracking-h6 ${
          isActive(Route.Login) ? "text-lightGray" : ""
        }`}
      >
        Login
      </Link>
      <Link
        href={Route.Registration}
        className={`text-h6 font-h6 leading-h6 tracking-h6 ${
          isActive(Route.Registration) ? "text-lightGray" : ""
        }`}
      >
        Register
      </Link>
    </>
  );
}
