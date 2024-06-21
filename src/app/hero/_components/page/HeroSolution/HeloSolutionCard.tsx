import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import HeroSolutionDialog from "./HeroSolutionDialog";
import HeroSolutionChecks from "./HeroSolutionChecks";

interface HeroSolutionCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  checks: string[];
}

const HeroSolutionCard: React.FC<HeroSolutionCardProps> = ({
  title,
  description,
  icon,
  checks,
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-col justify-center gap-2 text-primary">
        <CardTitle className="mx-auto text-6xl">{icon}</CardTitle>
        <CardDescription className="text-xl text-secondary-foreground">
          {title}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="hidden md:block">
          {description}
          <HeroSolutionChecks checks={checks} />
        </div>
        <div className="block md:hidden">
          <HeroSolutionDialog
            title={title}
            description={description}
            checks={checks}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default HeroSolutionCard;
