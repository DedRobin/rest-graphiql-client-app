import React from "react";

interface IBurgerButton {
  isBurgerMenuOpen: boolean;
  toggleBurgerMenu: () => void;
}

export const BurgerButton: React.FC<IBurgerButton> = ({
  isBurgerMenuOpen,
  toggleBurgerMenu,
}) => {
  const handleClick = () => {
    toggleBurgerMenu();
  };

  return (
    <div
      className="relative w-4 h-6 cursor-pointer flex justify-center items-center sm:hidden"
      onClick={handleClick}
      role="button"
    >
      <span
        className={`absolute block w-4 h-0.5 bg-green transition-transform duration-300 ${
          isBurgerMenuOpen ? "rotate-45" : ""
        }`}
      ></span>
      <span
        className={`absolute block w-4 h-0.5 bg-green transition-transform duration-300 ${
          isBurgerMenuOpen ? "-rotate-45" : ""
        }`}
      ></span>
    </div>
  );
};
