import { logout } from "@/app/actions/auth";
import { useAuth } from "@/app/contex";
import { Route } from "@/app/routes";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

export function AuthBtnGroup() {
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const logoutThenRedirect = async (event: React.MouseEvent) => {
    event.preventDefault();
    await logout();
    router.refresh();
  };

  const isActive = (route: string) => pathname === route;

  const renderAuthLink = (route: string, label: string) => (
    <li className="auth-link-item">
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
