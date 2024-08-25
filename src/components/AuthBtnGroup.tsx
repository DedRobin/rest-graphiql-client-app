import { logout } from "@/app/actions/auth";
import { auth } from "@/firebase";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";

export default function AuthBtnGroup() {
  const [user] = useAuthState(auth);
  const router = useRouter();

  const logoutThenRedirect = () => {
    logout();
    router.push("/login");
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
            href="/login"
            className="sign-in text-center border-2 rounded p-2 hover:border-lime-400 hover:text-lime-500"
          >
            Sign in
          </Link>
          <Link
            href="/register"
            className="sign-up text-center border-2 rounded p-2 hover:border-lime-400 hover:text-lime-500"
          >
            Sign up
          </Link>
        </>
      )}
    </div>
  );
}
