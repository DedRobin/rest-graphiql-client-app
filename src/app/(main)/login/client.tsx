"use client";

import { useForm } from "react-hook-form";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/firebase";
import { loginWithEmailAndPassword, TLoginForm } from "@/app/actions/auth";
import Loader from "@/components/UI/Loader";

export default function Login() {
  const {
    register,
    handleSubmit,
    // watch,
    // formState: { errors },
  } = useForm<TLoginForm>();
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (user) router.push("/");
  }, [user, loading, router]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <form
          className="login-form flex flex-col gap-3"
          onSubmit={handleSubmit(loginWithEmailAndPassword)}
        >
          <h1 className="login-heading text-5xl text-center my-5">Login</h1>
          <div className="email-field flex gap-3 justify-between">
            <label htmlFor="email">Email</label>
            <input
              className="email-input text-black"
              id="email"
              type="email"
              {...register("email")}
            />
          </div>
          <div className="password-field flex gap-3 justify-between">
            <label htmlFor="password">Password</label>
            <input
              className="password-input text-black"
              id="password"
              type="password"
              {...register("password")}
            />
          </div>
          <button
            className="sign-in-btn border-2 rounded-full hover:border-lime-400 hover:text-lime-500"
            type="submit"
          >
            Sign in
          </button>
        </form>
      )}
    </>
  );
}
