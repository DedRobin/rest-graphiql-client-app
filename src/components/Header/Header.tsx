"use client";

import { AuthBtnGroup } from "./AuthBtnGroup";
import { Nav } from "./Nav";

export function Header() {
  return (
    <header className="header flex justify-between sm:px-8 lg:px-12">
      <Nav />
      <AuthBtnGroup />
    </header>
  );
}
