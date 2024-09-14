import React from "react";

interface ListInputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  options: string[];
  disabled?: boolean;
  name: string;
}

export const ListInput: React.FC<ListInputProps> = ({
  label,
  placeholder,
  value,
  onChange,
  error,
  options,
  disabled,
  name,
}) => {
  return (
    <div className="relative">
      {label && (
        <label
          htmlFor={name}
          className="block text-h5 font-h5 leading-h5 tracking-h5 text-green mb-2"
        >
          {label}
        </label>
      )}
      <input
        type="text"
        list={`${name}-list`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="w-full px-4 py-2 placeholder-mediumGray bg-black border border-mediumGray rounded-none text-h6 font-h6 leading-h6 tracking-h6 text-lightGray focus:outline-none focus:border-lightGray focus:bg-darkGray transition-colors duration-300"
      />
      <datalist id={`${name}-list`}>
        {options.map((option, index) => (
          <option key={index} value={option} />
        ))}
      </datalist>
      {error && (
        <div className="text-red text-span font-span leading-span tracking-span mt-2 ml-4">
          {error}
        </div>
      )}
    </div>
  );
};
