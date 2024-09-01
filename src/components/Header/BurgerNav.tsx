import { Route } from "@/app/routes";
import { auth } from "@/services/firebase";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";

export function BurgerNav() {
  const [user] = useAuthState(auth);
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
            {renderNavLink(Route.GraphiQL, "GraphQL")}
            {renderNavLink(Route.RESTfull, "RESTfull")}
            {renderNavLink(Route.RESTfull, "History")}
          </>
        )}
      </ul>
    </nav>
  );
}
