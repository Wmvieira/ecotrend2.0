"use client";

import HeaderNavItem from "./HeaderNavItem";

export default function HeaderNav() {
  const h = typeof window !== "undefined" ? window.innerHeight : 0;

  return (
    <nav className="my-auto">
      <ul className="hidden w-0 md:flex md:w-fit md:gap-20">
        <HeaderNavItem title="Solução" scrollPx={h} />
        <HeaderNavItem title="Sobre" scrollPx={h * 3} />
        <HeaderNavItem title="Contatos" scrollPx={h * 3.5} />
      </ul>
    </nav>
  );
}
