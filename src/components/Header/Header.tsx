"use client";

import React, { useState } from "react";
import { AuthBtnGroup } from "./AuthBtnGroup";
import { Nav } from "./Nav";
import { BurgerButton } from "../UI/buttons/BurgerButton/BurgerButton";
import { Logo } from "../UI/logo/Logo";
import Link from "next/link";
import { Route } from "@/app/routes";
import { BurgerMenu } from "./BurgerMenu";
import { ToggleSwitch } from "../UI/buttons/ToggleSwitch/ToggleSwitch";
import { useLocale } from "@/services/locale/contex";

export function Header() {
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
  const { language, changeLanguage } = useLocale();

  const toggleBurgerMenu = () => {
    setIsBurgerMenuOpen(!isBurgerMenuOpen);
  };

  const handleToggle = (checked: boolean) => {
    changeLanguage(checked ? "ru" : "en");
  };

  return (
    <header
      className="header flex justify-between items-center sm:px-8 lg:px-12"
      data-testid="header"
    >
      <Link href={Route.Main}>
        <Logo />
      </Link>

      <div className="hidden sm:flex items-center gap-4 w-full ml-4">
        <Nav />
        <ToggleSwitch language={language} onToggle={handleToggle} />
        <AuthBtnGroup />
      </div>

      <BurgerButton
        isBurgerMenuOpen={isBurgerMenuOpen}
        toggleBurgerMenu={toggleBurgerMenu}
      />

      <BurgerMenu isOpen={isBurgerMenuOpen} onToggle={handleToggle} />
    </header>
  );
}
