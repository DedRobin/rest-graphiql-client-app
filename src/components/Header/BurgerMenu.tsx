// components/BurgerMenu.tsx
import React from "react";
import { BurgerNav } from "./BurgerNav"; // Импортируем новый компонент BurgerNav
import { AuthBtnGroup } from "./AuthBtnGroup";

interface BurgerMenuProps {
  isOpen: boolean;
}

export function BurgerMenu({ isOpen }: BurgerMenuProps) {
  return (
    <div
      className={`fixed top-12 right-0 bg-darkGray z-50 transition-transform duration-300 transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } sm:hidden`}
    >
      <div className="pl-6 pb-8 pt-2 pr-16">
        <BurgerNav />
        <AuthBtnGroup />
      </div>
    </div>
  );
}
