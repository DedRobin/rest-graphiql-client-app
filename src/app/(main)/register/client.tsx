"use client";

import { registerWithEmailAndPassword } from "@/app/actions/auth";
import Loader from "@/components/UI/Loader";
import { auth } from "@/firebase";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import registrationSchema from "./schema";

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
    // watch,
    formState: { errors },
  } = useForm<TRegisterForm>({
    resolver: yupResolver(registrationSchema),
    mode: "all",
  });
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
          className="registration-form flex flex-col gap-3"
          onSubmit={handleSubmit(registerWithEmailAndPassword)}
        >
          <h1 className="registration-heading text-5xl text-center my-5">
            Registration
          </h1>
          <div className="name-field">
            <div className="name-wrapper flex gap-3 justify-between">
              <label htmlFor="name">Name</label>
              <input
                className="name-input text-black"
                id="name"
                type="text"
                {...register("name")}
              />
            </div>
            <p className="error text-sm text-right text-red-500 min-h-6 ">
              {errors.name?.message}
            </p>
          </div>
          <div className="email-field">
            <div className="email-wrapper flex gap-3 justify-between">
              <label htmlFor="email">Email</label>
              <input
                className="email-input text-black"
                id="email"
                type="email"
                {...register("email")}
              />
            </div>
            <p className="error text-sm text-right text-red-500 min-h-6">
              {errors.email?.message}
            </p>
          </div>
          <div className="password-field flex flex-col">
            <div className="password-wrapper flex justify-between">
              <label htmlFor="password">Password</label>
              <input
                className="password-input text-black"
                id="password"
                type="password"
                {...register("password")}
              />
            </div>
            <p className="error text-sm text-right text-red-500 min-h-6">
              {errors.password?.message}
            </p>
            <div className="confirm-password-wrapper flex gap-3 justify-between">
              <label htmlFor="confirm-password">Confirm Password</label>
              <input
                className="confirm-password-input text-black"
                id="confirm-password"
                type="password"
                {...register("confirmPassword")}
              />
            </div>
            <p className="error text-sm text-right text-red-500 min-h-6">
              {errors.confirmPassword?.message}
            </p>
          </div>
          <button
            className="sign-in-btn border-2 rounded-full hover:border-lime-400 hover:text-lime-500"
            type="submit"
          >
            Register
          </button>
        </form>
      )}
    </>
  );
}
