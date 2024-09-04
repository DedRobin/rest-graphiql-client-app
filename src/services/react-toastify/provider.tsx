"use client";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

interface ToastProviderProps {
  children: React.ReactNode;
}

export default function ToastProvider({ children }: ToastProviderProps) {
  // const contextClass = {
  //   success: "bg-blue-600",
  //   error: "bg-red border-[#000000]",
  //   info: "bg-gray-600",
  //   warning: "bg-orange-400",
  //   default: "bg-indigo-600 border-green",
  //   dark: "bg-white-600 font-gray-300",
  // };

  return (
    <>
      {children}
      <ToastContainer
        // toastClassName={(context) =>
        //   contextClass[context?.type || "default"] +
        //   " relative flex p-1 my-32 min-h-10 justify-between overflow-hidden cursor-pointer border-8"
        // }
        position="bottom-right"
        theme="dark"
        progressStyle={{ backgroundColor: "#F3F3F3" }}
      />
    </>
  );
}
