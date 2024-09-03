import { useAuth } from "@/app/contex";
import { Route } from "@/app/routes";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function BurgerNav() {
  const { user } = useAuth();
  const pathname = usePathname();

  const isActive = (route: string) => pathname === route;

  const renderNavLink = (route: string, label: string) => (
    <li className="burger-nav-link-item">
      <Link
        href={route}
        className={`h5 text-h5 font-h5 leading-h5 tracking-h5 text-center transition-colors duration-300 ${
          isActive(route) ? "text-lightGray" : ""
        }`}
      >
        {label}
      </Link>
    </li>
  );

  return (
    <nav className="burger-nav flex flex-col w-full justify-center">
      <ul className="burger-nav-links flex flex-col gap-2 py-4">
        {user && (
          <>
            {renderNavLink(Route.GraphQL, "GraphQL")}
            {renderNavLink(Route.RESTfull, "RESTfull")}
            {renderNavLink(Route.History, "History")}
          </>
        )}
      </ul>
    </nav>
  );
}
