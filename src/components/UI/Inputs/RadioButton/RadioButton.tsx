import React from "react";

interface RadioButtonProps {
  value: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
}

export function RadioButton({
  value,
  checked,
  onChange,
  label,
}: RadioButtonProps) {
  return (
    <label className="flex items-center space-x-2 cursor-pointer">
      <input
        type="radio"
        value={value}
        checked={checked}
        onChange={onChange}
        className="hidden"
      />
      <div
        className={`w-2 h-2 rounded-full ${
          checked ? "bg-green" : "bg-darkGray"
        } flex items-center justify-center`}
      />
      <span className="text-mediumGray">{label}</span>
    </label>
  );
}
