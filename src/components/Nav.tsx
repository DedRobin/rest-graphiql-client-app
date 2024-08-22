import { logout } from "@/app/actions/auth";
import { auth } from "@/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Nav() {
  const [user] = useAuthState(auth);

  return (
    <>
      {user ? (
        <nav className="nav flex justify-between">
          <div className="auth-btn-group">
            <button
              className="log-out-btn hover:border-lime-400 hover:text-lime-500"
              type="button"
              onClick={logout}
            >
              Log out
            </button>
          </div>
        </nav>
      ) : null}
    </>
  );
}
