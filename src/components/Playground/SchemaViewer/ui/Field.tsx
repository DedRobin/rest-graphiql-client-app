import React from "react";
import Image from "next/image";
import { cn } from "@/utils/cn";

interface FieldProps {
  name: string;
  type: string;
  separator?: string;
  className?: string;
  onClick?: () => void;
  isOpen?: boolean;
}

export const Field: React.FC<FieldProps> = ({
  name,
  type,
  separator = ": ",
  className = "",
  onClick,
  isOpen = false,
}) => {
  return (
    <div>
      <button
        onClick={onClick}
        className={cn(
          "flex items-center justify-between px-4 py-2 w-full text-left transition-colors",
          {
            "bg-black": !isOpen,
            "bg-darkGray": isOpen,
            "text-lightGray": !isOpen,
          },
        )}
      >
        <div className="flex items-center">
          <div className="flex flex-col">
            <div className="flex flex-row items-center">
              <h6 className={cn("text-lightGray", className)}>{name}</h6>
              {separator}
            </div>
            <span className="text-mediumGray">{type}</span>
          </div>
        </div>
        <Image
          src={
            isOpen
              ? "/icons/button-right--arrow.svg"
              : "/icons/button-left--arrow.svg"
          }
          alt="Toggle"
          width={14}
          height={14}
          className="transition-transform"
        />
      </button>
    </div>
  );
};
