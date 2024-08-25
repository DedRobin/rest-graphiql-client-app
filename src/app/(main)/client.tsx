"use client";

import Loader from "@/components/UI/Loader";
import { auth } from "@/firebase";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Home() {
  const [user, loading] = useAuthState(auth);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="home flex flex-col gap-2">
          {user ? (
            <div className="text-5xl">
              Welcome, {user.displayName || user.email}
            </div>
          ) : (
            <>
              <div className="home-welcome text-5xl">Welcome</div>
              <Link
                href="/login"
                className="sign-in text-center border-2 rounded-full hover:border-lime-400 hover:text-lime-500"
              >
                Sign in
              </Link>
              <Link
                href="/register"
                className="sign-up text-center border-2 rounded-full hover:border-lime-400 hover:text-lime-500"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      )}
    </>
  );
}
