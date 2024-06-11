import React from "react";
import HeroResume from "./HeroResume";

const HeroIntro: React.FC = () => {
  return (
    <div className="flex h-screen w-screen flex-col justify-evenly gap-10 p-2 text-center md:gap-16">
      <HeroResume />
    </div>
  );
};

export default HeroIntro;
