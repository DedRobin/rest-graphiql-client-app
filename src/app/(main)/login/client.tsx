"use client";

import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { loginWithEmailAndPassword, TLoginForm } from "@/app/actions/auth";
import { EmailInput } from "@/components/UI/Inputs/EmailInput/EmailInput";
import { PasswordInput } from "@/components/UI/Inputs/PasswordInput/PasswordInput";
import { LargeButton } from "@/components/UI/buttons/LargeButton/LargeButton";
import { Route } from "@/app/routes";
import UnauthenticatedSidebarNavigation from "@/components/UI/Navigation/UnauthenticatedSidebarNavigation";
import { useAuth } from "@/services/next-firebase-auth-edge/contex";
import { toast } from "react-toastify";

export default function Login() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TLoginForm>();
  const { user } = useAuth();
  const router = useRouter();

  const [error, setError] = useState<string | null>(null);
  if (error) throw new Error(error);

  useEffect(() => {
    if (user) router.push(Route.Main);
  }, [user, router]);

  const email = watch("email") || "";
  const password = watch("password") || "";
  const isButtonDisabled = email === "" || password === "";

  const login = async (data: TLoginForm) => {
    const { response, error } = await loginWithEmailAndPassword(data);
    if (error) setError(error.message);
    else if (response && response.status === 200) {
      toast.success("The login was completed successfully");
      router.push(Route.Main);
      router.refresh();
    }
  };

  return (
    <>
      <form
        className="flex-container col-span-8 sm:col-span-8 md:col-span-6 lg:col-span-4"
        onSubmit={handleSubmit(login)}
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
        <UnauthenticatedSidebarNavigation />
      </div>
    </>
  );
}
