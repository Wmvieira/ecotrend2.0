"use client";

import React from "react";

interface HeaderNavItemProps {
  title: string;
  scrollPx: number;
}

const HeaderNavItem: React.FC<HeaderNavItemProps> = ({ title, scrollPx }) => {
  const handleScroll = () => {
    window.scrollTo({
      top: scrollPx,
      behavior: "smooth",
    });
  };

  return (
    <li
      className="hover:text-secondary cursor-pointer font-semibold transition-colors md:text-lg"
      onClick={handleScroll}
    >
      {title}
    </li>
  );
};

export default HeaderNavItem;
