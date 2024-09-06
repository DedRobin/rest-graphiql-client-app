import { Route } from "@/app/routes";
import { useAuth } from "@/services/next-firebase-auth-edge/contex";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Nav() {
  const { user } = useAuth();
  const pathname = usePathname();

  const isActive = (route: string) => pathname === route;

  const renderNavLink = (route: string, label: string) => (
    <li className="nav-link-item">
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
    <nav className="nav flex items-center gap-4 w-full justify-center">
      <ul className="nav-links flex flex-row gap-12">
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
