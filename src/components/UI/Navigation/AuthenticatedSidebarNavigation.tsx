"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Route } from "@/app/routes";

export default function AuthenticatedSidebarNavigation() {
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
        href={Route.RESTfull}
        className={`text-h6 font-h6 leading-h6 tracking-h6 ${
          isActive(Route.RESTfull) ? "text-lightGray" : ""
        }`}
      >
        RESTful
      </Link>
      <Link
        href={Route.GraphiQL}
        className={`text-h6 font-h6 leading-h6 tracking-h6 ${
          isActive(Route.GraphiQL) ? "text-lightGray" : ""
        }`}
      >
        GraphiQL
      </Link>
      <Link
        href={Route.GraphiQL}
        className={`text-h6 font-h6 leading-h6 tracking-h6 ${
          isActive(Route.GraphiQL) ? "text-lightGray" : ""
        }`}
      >
        History
      </Link>
    </>
  );
}
