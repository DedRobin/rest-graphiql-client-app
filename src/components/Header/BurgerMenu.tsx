// components/BurgerMenu.tsx
import React from "react";
import { BurgerNav } from "./BurgerNav";
import { AuthBtnGroup } from "./AuthBtnGroup";
import { ToggleSwitch } from "../UI/buttons/ToggleSwitch/ToggleSwitch";

interface BurgerMenuProps {
  isOpen: boolean;
  onToggle?: (checked: boolean) => void;
}

export function BurgerMenu({ isOpen, onToggle }: BurgerMenuProps) {
  return (
    <div
      className={`fixed top-12 right-0 bg-darkGray z-50 transition-transform duration-300 transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } sm:hidden`}
    >
      <div className="pl-6 pb-8 pt-2 pr-16">
        <ToggleSwitch isChecked={true} onToggle={onToggle} />
        <BurgerNav />
        <AuthBtnGroup />
      </div>
    </div>
  );
}
