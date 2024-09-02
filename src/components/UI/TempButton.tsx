import React, { PropsWithChildren } from "react";
import { cn } from "@/utils/cn";

export function TempButton({
  children,
  type = "button",
  className = "",
  disabled = false,
  ...attributes
}: PropsWithChildren<React.ButtonHTMLAttributes<HTMLButtonElement>>) {
  return (
    <button
      className={cn(
        "border-2 border-gray-400 rounded hover:border-lime-400 hover:text-lime-500",
        className,
        { "bg-slate-300 select-none pointer-events-none": disabled },
      )}
      type={type === "submit" ? "submit" : "button"}
      disabled={disabled}
      {...attributes}
    >
      {children}
    </button>
  );
}
