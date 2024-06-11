import React from "react";
import HeroIntro from "./_components/page/HeroIntro/HeroIntro";
import HeroCompany from "./_components/page/HeroCompany/HeroCompany";
import HeroSolution from "./_components/page/HeroSolution/HeroSolution";

export default function HeroPage() {
  return (
    <>
      <HeroIntro />
      <HeroSolution />
      <HeroCompany />
    </>
  );
}
