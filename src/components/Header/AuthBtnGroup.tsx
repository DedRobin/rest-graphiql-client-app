import { logout } from "@/app/actions/auth";
import { Route } from "@/app/routes";
import { useAuth } from "@/services/next-firebase-auth-edge/contex";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import localeData from "@/services/locale/lang.json";
import { useLocale } from "@/services/locale/contex";

export function AuthBtnGroup() {
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const { language } = useLocale();

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
              {localeData.authBtnGroup.logout[language]}
            </Link>
          </li>
        ) : (
          <>
            {renderAuthLink(
              Route.Login,
              localeData.authBtnGroup.login[language],
            )}
            {renderAuthLink(
              Route.Registration,
              localeData.authBtnGroup.register[language],
            )}
          </>
        )}
      </ul>
    </nav>
  );
}
