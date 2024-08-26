import { Route } from "@/app/routes";
import { auth } from "@/services/firebase";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";

export function Nav() {
  const [user] = useAuthState(auth);
  const pathname = usePathname();

  return (
    <nav className="nav flex">
      <ul className="nav-links flex items-center gap-2">
        <li className="nav-link-item">
          <Link
            className={`hover:text-lime-500 ${pathname === Route.Main ? "text-lime-500 underline" : ""}`}
            href={Route.Main}
          >
            Main
          </Link>
        </li>
        {user ? (
          <>
            <li className="nav-link-item">
              <Link
                className={`hover:text-lime-500 ${pathname === Route.GraphiQL ? "text-lime-500 underline" : ""}`}
                href={Route.GraphiQL}
              >
                GraphQL
              </Link>
            </li>
            <li className="nav-link-item">
              <Link
                className={`hover:text-lime-500 ${pathname === Route.RESTfull ? "text-lime-500 underline" : ""}`}
                href={Route.RESTfull}
              >
                RESTfull
              </Link>
            </li>
          </>
        ) : null}
      </ul>
    </nav>
  );
}
