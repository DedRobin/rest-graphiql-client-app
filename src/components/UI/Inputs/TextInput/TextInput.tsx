import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface TextInputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  disabled?: boolean;
  register: UseFormRegisterReturn;
}

export const TextInput: React.FC<TextInputProps> = ({
  label,
  placeholder,
  value,
  onChange,
  error,
  disabled,
  register,
}) => {
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
      <input
        {...register}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`w-full px-4 py-2 placeholder-mediumGray bg-black border border-mediumGray rounded-none 
            text-h6 font-h6 leading-h6 tracking-h6 text-lightGray 
            focus:outline-none focus:border-lightGray focus:bg-darkGray
            transition-colors duration-300 ${
              disabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
      />
      {error && (
        <div className="text-red text-span font-span leading-span tracking-span mt-2 ml-4">
          {error}
        </div>
      )}
    </div>
  );
};
