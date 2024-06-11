import React from "react";
import HeroSolutionResume from "./HeroSolutionResume";
import HeroSolutionTopics from "./HeroSolutionTopics";

const HeroSolution: React.FC = () => {
  return (
    <div className="bg-primary text-primary-foreground flex h-screen w-screen flex-col justify-center gap-20 p-2 text-center md:gap-20 md:p-10">
      <HeroSolutionResume />
      <HeroSolutionTopics />
    </div>
  );
};

export default HeroSolution;
