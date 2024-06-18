import React from "react";
import HeaderLogo from "./HeaderLogo";
import { currentUser } from "@clerk/nextjs/server";
import HeaderWelcome from "./HeaderWelcome";
import HeaderInteraction from "./HeaderInteraction";

const Header: React.FC = async () => {
  const user = await currentUser();

  const name = user?.firstName ? `${user.firstName}` : user?.username;

  return (
    <header className="flex h-16 w-full flex-row justify-around gap-2 px-2 md:h-24 md:gap-3">
      <HeaderLogo />
      <HeaderWelcome username={name ?? ""} />
      <HeaderInteraction />
    </header>
  );
};

export default Header;
