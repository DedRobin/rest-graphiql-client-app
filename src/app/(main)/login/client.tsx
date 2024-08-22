"use client";

import { SubmitHandler, useForm } from "react-hook-form";

interface TFormInput {
  email: string;
  password: string;
}

export default function Login() {
  const {
    register,
    handleSubmit,
    // watch,
    // formState: { errors },
  } = useForm<TFormInput>();

  const onSubmit: SubmitHandler<TFormInput> = (data) => console.log(data);

  return (
    <form
      className="login-form flex flex-col gap-3"
      onSubmit={handleSubmit(onSubmit)}
    >
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
  );
}
