import { logout } from "@/app/actions/auth";
import { Route } from "@/app/routes";
import { auth } from "@/services/firebase";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";

export function AuthBtnGroup() {
  const [user] = useAuthState(auth);
  const router = useRouter();

  const logoutThenRedirect = () => {
    logout();
    router.push(Route.Login);
  };

  return (
    <div className="auth-btn-group flex gap-2">
      {user ? (
        <button
          className="log-out-btn border-2 rounded p-2 hover:border-lime-400 hover:text-lime-500"
          type="button"
          onClick={logoutThenRedirect}
        >
          Log out
        </button>
      ) : (
        <>
          <Link
            href={Route.Login}
            className="sign-in text-center border-2 rounded p-2 hover:border-lime-400 hover:text-lime-500"
          >
            Sign in
          </Link>
          <Link
            href={Route.Registration}
            className="sign-up text-center border-2 rounded p-2 hover:border-lime-400 hover:text-lime-500"
          >
            Sign up
          </Link>
        </>
      )}
    </div>
  );
}
