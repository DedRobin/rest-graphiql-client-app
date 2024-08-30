"use client";

import { useForm } from "react-hook-form";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { auth } from "@/services/firebase";
import { loginWithEmailAndPassword, TLoginForm } from "@/app/actions/auth";
// import { Loader } from "@/components/UI/Loader";
import { EmailInput } from "@/components/UI/Inputs/EmailInput/EmailInput";
import { PasswordInput } from "@/components/UI/Inputs/PasswordInput/PasswordInput";
import { LargeButton } from "@/components/UI/buttons/LargeButton/LargeButton";
import LoginSkeleton from "@/components/UI/Skeletons/LoginSkeleton";
import { Route } from "@/app/routes";

export default function Login() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TLoginForm>();
  const [user, isLoading] = useAuthState(auth);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isLoading) return;
    if (user) router.push("/");
  }, [user, isLoading, router]);

  const email = watch("email") || "";
  const password = watch("password") || "";
  const isButtonDisabled = email === "" || password === "";

  const isActive = (route: string) => pathname === route;

  return (
    <>
      {isLoading ? (
        <LoginSkeleton />
      ) : (
        <>
          <form
            className="flex-container col-span-8 sm:col-span-8 md:col-span-6 lg:col-span-4"
            onSubmit={handleSubmit(loginWithEmailAndPassword)}
          >
            <h2>Please Login</h2>
            <span className="-mt-2">
              Login in to your account to continue working with APIs and graphs.
              Experience the simplicity and power of our unified tool in one
              interface.
            </span>
            <EmailInput
              label="Email"
              placeholder="Enter your email"
              value={email}
              onChange={register("email").onChange}
              error={errors?.email?.message}
              register={register("email")}
            />
            <PasswordInput
              label="Password"
              placeholder="Enter your password"
              value={password}
              error={errors?.password?.message}
              disabled={false}
              register={register("password")}
            />
            <div className="flex justify-between items-center mt-4">
              <LargeButton disabled={isButtonDisabled} disabledText="Login">
                Sign in
              </LargeButton>
              <div className="opacity-60">
                <span>
                  Don&apos;t have an account?&nbsp;
                  <Link href={Route.Registration}>Register now</Link>
                </span>
              </div>
            </div>
          </form>
          <div className="hidden md:hidden lg:block lg:col-start-5 lg:col-span-3 bg-cover bg-center bg-[url('/luke-jones-38Tm9xZPxIw-unsplash%201.webp')] h-full"></div>
          <div className="button-container lg:col-span-1 lg:col-start-8 md:col-start-7 md:col-span-2 hidden sm:flex flex-col gap-4 items-end">
            <Link
              href={Route.Login}
              className={`text-h6 font-h6 leading-h6 tracking-h6 ${
                isActive(Route.Login) ? "text-lightGray" : ""
              }`}
            >
              Login
            </Link>
            <Link
              href={Route.Registration}
              className={`text-h6 font-h6 leading-h6 tracking-h6 ${
                isActive(Route.Registration) ? "text-lightGray" : ""
              }`}
            >
              Register
            </Link>
          </div>
        </>
      )}
    </>
  );
}
