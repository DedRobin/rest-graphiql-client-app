import { logout } from "@/app/actions/auth";
import { Route } from "@/app/routes";
import { auth } from "@/services/firebase";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { usePathname } from "next/navigation";

export function AuthBtnGroup() {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const pathname = usePathname();

  const logoutThenRedirect = () => {
    logout();
    router.push(Route.Login);
  };

  const isActive = (route: string) => pathname === route;

  return (
    <div className="auth-btn-group flex gap-6">
      {user ? (
        <button
          className="h5 text-h5 font-h5 leading-h5 tracking-h5 text-center"
          type="button"
          onClick={logoutThenRedirect}
        >
          Log out
        </button>
      ) : (
        <>
          <Link
            href={Route.Login}
            className={`h5 text-h5 font-h5 leading-h5 tracking-h5 text-center ${
              isActive(Route.Login) ? "text-lightGray" : ""
            }`}
          >
            Login
          </Link>
          <Link
            href={Route.Registration}
            className={`h5 text-h5 font-h5 leading-h5 tracking-h5 text-center ${
              isActive(Route.Registration) ? "text-lightGray" : ""
            }`}
          >
            Register
          </Link>
        </>
      )}
    </div>
  );
}
