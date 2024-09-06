"use client";

import { registerWithEmailAndPassword } from "@/app/actions/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import registrationSchema from "./schema";
import { EmailInput } from "@/components/UI/Inputs/EmailInput/EmailInput";
import { PasswordInput } from "@/components/UI/Inputs/PasswordInput/PasswordInput";
import { LargeButton } from "@/components/UI/buttons/LargeButton/LargeButton";
import { Route } from "@/app/routes";
import Link from "next/link";
import { TextInput } from "@/components/UI/Inputs/TextInput/TextInput";
import UnauthenticatedSidebarNavigation from "@/components/UI/Navigation/UnauthenticatedSidebarNavigation";
import { useAuth } from "@/services/next-firebase-auth-edge/contex";
import { toast } from "react-toastify";

export type TRegisterForm = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function Register() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TRegisterForm>({
    resolver: yupResolver(registrationSchema),
    mode: "all",
  });
  const { user } = useAuth();
  const router = useRouter();

  const [error, setError] = useState<string | null>(null);
  if (error) throw new Error(error);

  useEffect(() => {
    if (user) router.push(Route.Login);
  }, [user, errors, router]);

  const name = watch("name") || "";
  const email = watch("email") || "";
  const password = watch("password") || "";
  const confirmPassword = watch("confirmPassword") || "";
  const isButtonDisabled =
    email === "" || password === "" || confirmPassword === "";

  const registerUser = async (data: TRegisterForm) => {
    const { isRegistered, error } = await registerWithEmailAndPassword(data);
    if (error) setError(error.message);
    else if (isRegistered) {
      toast("The user has been successfully registered!", { type: "success" });
      router.push(Route.Login);
    }
  };

  return (
    <>
      <form
        className="flex-container col-span-8 sm:col-span-8 md:col-span-6 lg:col-span-4"
        onSubmit={handleSubmit(registerUser)}
      >
        <h2>Please Register</h2>
        <span className="-mt-2">
          Create a new account to start working with APIs faster and easier than
          ever. Unlock the full potential of our tool, combining the best of
          Postman and GraphiQL.
        </span>
        <TextInput
          label="Name"
          placeholder="Enter your name"
          value={name}
          onChange={register("name").onChange}
          error={errors.name?.message}
          register={register("name")}
        />
        <EmailInput
          label="Email"
          placeholder="Enter your email"
          value={email}
          onChange={register("email").onChange}
          error={errors.email?.message}
          register={register("email")}
        />
        <PasswordInput
          label="Password"
          placeholder="Enter your password"
          value={password}
          error={errors.password?.message}
          disabled={false}
          register={register("password")}
        />
        <PasswordInput
          label="Confirm Password"
          placeholder="Confirm your password"
          value={confirmPassword}
          error={errors.confirmPassword?.message}
          disabled={false}
          register={register("confirmPassword")}
        />
        <div className="flex justify-between items-center mt-4">
          <LargeButton disabled={isButtonDisabled} disabledText="Register">
            Register
          </LargeButton>
          <div className="opacity-60">
            <span>
              Already have an account?&nbsp;
              <Link
                href={Route.Login}
                className="text-green hover:text-lightGray"
              >
                Login now
              </Link>
            </span>
          </div>
        </div>
      </form>
      <div className="hidden md:hidden lg:block lg:col-start-5 lg:col-span-3 bg-cover bg-center bg-[url('/Rectangle.webp')] h-full"></div>
      <div className="button-container lg:col-span-1 lg:col-start-8 md:col-start-7 md:col-span-2 hidden sm:flex flex-col gap-4 items-end">
        <UnauthenticatedSidebarNavigation />
      </div>
    </>
  );
}
