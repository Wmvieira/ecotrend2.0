"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import React, { type ReactNode } from "react";

interface SideNavItemProps {
  href: string;
  children: ReactNode;
}

const SideNavItem: React.FC<SideNavItemProps> = ({ href, children }) => {
  const pathname = usePathname();

  return (
    <div
      className={`md:h-14 md:w-14 ${pathname.includes(href) ? "border-b-2 border-secondary text-secondary" : ""}`}
    >
      <Link
        href={href}
        className="my-auto flex h-full items-center justify-center text-2xl"
      >
        {children}
      </Link>
    </div>
  );
};

export default SideNavItem;
