import React, { useState } from "react";

interface DropdownProps {
  label: string;
  options: string[];
  onSelect: (option: string) => void;
}

export const Dropdown: React.FC<DropdownProps> = ({
  label,
  options,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (option: string) => {
    setSelected(option);
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 bg-darkGray flex items-center w-full text-h6 font-h6 leading-h6 tracking-h6"
      >
        {selected ? selected : label}
        <span className="ml-2">&#9662;</span>{" "}
        {/* Замените стрелку на свою иконку */}
      </button>
      {isOpen && (
        <ul className="absolute bg-darkGray w-full z-10">
          {options.map((option, index) => (
            <li
              key={index}
              onClick={() => handleSelect(option)}
              className="px-4 py-2 hover:bg-black cursor-pointer"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
