import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import {cn} from "@/utils/cn";

interface TextInputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  error?: string;
  disabled?: boolean;
  register?: UseFormRegisterReturn;
  className?: string;
  defaultValue?: string;
}

export const TextInput: React.FC<TextInputProps> = ({
  label,
  placeholder,
  value,
  defaultValue,
  onChange,
  onBlur,
  error,
  disabled,
  register,
  className,
}) => {
  return (
    <div className="relative w-full">
      {label && (
        <label
          htmlFor={register?.name}
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
        onBlur={onBlur}
        disabled={disabled}
        defaultValue={defaultValue}
        className={cn(
          "w-full px-4 py-2 placeholder-mediumGray bg-black border border-mediumGray rounded-none",
          "text-h6 font-h6 leading-h6 tracking-h6 text-lightGray",
          "focus:outline-none focus:border-lightGray focus:bg-darkGray",
          "transition-colors duration-300",
          className,
          { "opacity-50 cursor-not-allowed": disabled },
        )}
      />
      {error && (
        <div className="text-red text-span font-span leading-span tracking-span mt-2 ml-4">
          {error}
        </div>
      )}
    </div>
  );
};
