"use client";

import { Loader } from "@/components/UI/Loader";
import { auth } from "@/services/firebase";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { Route } from "../routes";

export function Home() {
  const [user, isLoading] = useAuthState(auth);

  return (
    <>
      {isLoading ? (
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
                href={Route.Login}
                className="sign-in text-center border-2 rounded-full hover:border-lime-400 hover:text-lime-500"
              >
                Sign in
              </Link>
              <Link
                href={Route.Registration}
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
