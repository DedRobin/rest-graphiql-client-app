import { logout } from "@/app/actions/auth";
import { Route } from "@/app/routes";
import { auth } from "@/services/firebase";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";

export function AuthBtnGroup() {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const pathname = usePathname();

  const logoutThenRedirect = async (event: React.MouseEvent) => {
    event.preventDefault();
    await logout();
    router.push(Route.Login);
  };

  const isActive = (route: string) => pathname === route;

  const renderAuthLink = (route: string, label: string) => (
    <li className="auth-link-item">
      <Link
        href={route}
        className={`h5 text-h5 font-h5 leading-h5 tracking-h5 text-center transition-colors duration-300 ${
          isActive(route) ? "text-lightGray" : ""
        }`}
        onClick={route === Route.Login ? logoutThenRedirect : undefined}
      >
        {label}
      </Link>
    </li>
  );

  return (
    <nav className="auth-btn-group flex gap-6 self-end">
      <ul className="auth-links flex gap-4">
        {user ? (
          <li className="auth-link-item">
            <Link
              href={Route.Login}
              className="h5 text-h5 font-h5 leading-h5 tracking-h5 text-center transition-colors duration-300"
              onClick={logoutThenRedirect}
            >
              Logout
            </Link>
          </li>
        ) : (
          <>
            {renderAuthLink(Route.Login, "Login")}
            {renderAuthLink(Route.Registration, "Register")}
          </>
        )}
      </ul>
    </nav>
  );
}
