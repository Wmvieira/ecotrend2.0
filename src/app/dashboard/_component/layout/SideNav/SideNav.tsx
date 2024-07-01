import React from "react";
import SideNavWrapper from "./SideNavWrapper";
import SideNavItem from "./SideNavItem";
import {
  FaChartLine,
  FaHouse,
  FaMagnifyingGlass,
  FaSquarePlus,
} from "react-icons/fa6";
import { UserButton } from "@clerk/nextjs";

const SideNav: React.FC = () => {
  return (
    <nav className="flex w-full flex-col gap-8 rounded-md bg-primary p-2 text-primary-foreground md:h-full md:w-20">
      <SideNavWrapper>
        <SideNavItem href="/dashboard">
          <FaHouse />
        </SideNavItem>
        <SideNavItem href="/dashboard/search">
          <FaMagnifyingGlass />
        </SideNavItem>
        <SideNavItem href="/dashboard/post/create">
          <FaSquarePlus />
        </SideNavItem>
        <SideNavItem href="/trending">
          <FaChartLine />
        </SideNavItem>
        <div className="md:mx-auto">
          <UserButton />
        </div>
      </SideNavWrapper>
    </nav>
  );
};

export default SideNav;
