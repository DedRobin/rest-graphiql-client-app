import React, { FC, ButtonHTMLAttributes, ReactNode } from "react";

interface ILargeButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  disabled?: boolean;
  disabledText?: string;
}

export const LargeButton: FC<ILargeButtonProps> = ({
  children,
  disabled,
  disabledText,
  ...props
}) => (
  <button
    {...props}
    className={`relative flex items-center gap-4 font-medium text-base uppercase bg-transparent border border-transparent rounded transition-transform duration-300 ease-in-out ${
      disabled
        ? "text-mediumGray opacity-50 cursor-not-allowed"
        : "text-lightGray group hover:cursor-pointer"
    }`}
    disabled={disabled}
  >
    <h5 className={`flex items-center font-normal`}>
      {disabled ? disabledText : children}
    </h5>
    {!disabled && (
      <span className="flex-shrink-0 transition-transform duration-300 ease-in-out transform-gpu origin-left group-hover:scale-x-110">
        <svg
          width="69"
          height="9"
          viewBox="0 0 69 9"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M68.3536 4.85355C68.5488 4.65829 68.5488 4.34171 68.3536 4.14645L65.1716 0.964466C64.9763 0.769204 64.6597 0.769204 64.4645 0.964466C64.2692 1.15973 64.2692 1.47631 64.4645 1.67157L67.2929 4.5L64.4645 7.32843C64.2692 7.52369 64.2692 7.84027 64.4645 8.03553C64.6597 8.2308 64.9763 8.2308 65.1716 8.03553L68.3536 4.85355ZM0 5H68V4H0V5Z"
            fill="#F3F3F3"
          />
        </svg>
      </span>
    )}
  </button>
);
