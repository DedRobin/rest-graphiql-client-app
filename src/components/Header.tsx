"use client";

import AuthBtnGroup from "./AuthBtnGroup";
import Nav from "./Nav";

export default function Header() {
  return (
    <header className="header flex justify-between p-4">
      <Nav />
      <AuthBtnGroup />
    </header>
  );
}
