import React from "react";
import HeaderNav from "./HeaderNav";
import HeaderLogin from "./HeaderLogin";
import HeaderLogo from "./HeaderLogo";

export default function Header() {
  return (
    <header className="bg-background sticky top-0 z-10 flex justify-between p-5">
      <HeaderLogo />
      <HeaderNav />
      <HeaderLogin />
    </header>
  );
}
