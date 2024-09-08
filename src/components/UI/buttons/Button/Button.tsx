import React, { PropsWithChildren } from "react";
import { cn } from "@/utils/cn";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  IconComponent?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export function Button({
  className = "",
  disabled = false,
  IconComponent,
  ...attributes
}: PropsWithChildren<ButtonProps>) {
  return (
    <div className="relative group">
      <button
        className={cn(" flex items-center justify-center", className, {
          "bg-darkGray select-none pointer-events-none": disabled,
        })}
        disabled={disabled}
        {...attributes}
      >
        {/* Иконка */}
        {IconComponent && (
          <IconComponent className=" text-green group-hover:text-lightGray group-active:text-lightGray transition-colors" />
        )}
      </button>
    </div>
  );
}
