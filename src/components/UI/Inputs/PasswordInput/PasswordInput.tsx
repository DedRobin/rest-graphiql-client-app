import React, { useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import Image from "next/image";

interface PasswordInputProps {
  label?: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  register: UseFormRegisterReturn;
  showPassword?: boolean;
  togglePasswordVisibility?: () => void;
  value?: string;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
  label,
  placeholder,
  error,
  disabled,
  register,
  showPassword = false,
  togglePasswordVisibility,
  value,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(showPassword);

  const handleTogglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
    if (togglePasswordVisibility) {
      togglePasswordVisibility();
    }
  };

  return (
    <div className="relative">
      {label && (
        <label
          htmlFor={register.name}
          className="block text-h5 font-h5 leading-h5 tracking-h5 text-green mb-2"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <input
          {...register}
          type={isPasswordVisible ? "text" : "password"}
          placeholder={placeholder}
          disabled={disabled}
          value={value}
          className={`w-full px-4 py-2 placeholder-mediumGray bg-black border border-mediumGray rounded-none 
            text-h6 font-h6 leading-h6 tracking-h6 text-lightGray 
            focus:outline-none focus:border-lightGray focus:bg-darkGray
            transition-colors duration-300 ${
              disabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
        />
        {!disabled && (
          <button
            type="button"
            onClick={handleTogglePasswordVisibility}
            className="absolute right-4 top-1/2 transform -translate-y-1/2"
            aria-label={isPasswordVisible ? "Hide password" : "Show password"}
          >
            <Image
              src={
                isPasswordVisible
                  ? "/icons/eye-open.svg"
                  : "/icons/eye-hide.svg"
              }
              alt="Toggle password visibility"
              width={14}
              height={14}
            />
          </button>
        )}
      </div>
      {error && (
        <div className="text-red text-span font-span leading-span tracking-span mt-2 ml-4">
          {error}
        </div>
      )}
    </div>
  );
};
