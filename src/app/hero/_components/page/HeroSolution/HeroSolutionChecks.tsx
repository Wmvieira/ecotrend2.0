"use client";

import { Label } from "@radix-ui/react-label";
import React from "react";
import { Checkbox } from "~/components/ui/checkbox";

interface HeroSolutionChecksProps {
  checks: string[];
}

const HeroSolutionChecks: React.FC<HeroSolutionChecksProps> = ({ checks }) => {
  return (
    <div className="p-2 text-left">
      <ul className="flex flex-col gap-2 md:gap-5">
        {checks.map((check, index) => (
          <li key={index} className="flex flex-row gap-2">
            <Checkbox id={check} checked className="my-auto" />
            <Label htmlFor={check} className="text-sm">
              {check}
            </Label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HeroSolutionChecks;
