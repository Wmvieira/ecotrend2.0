import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import HeroSolutionChecks from "./HeroSolutionChecks";

interface HeroSolutionDialogProps {
  title: string;
  description: string;
  checks: string[];
}

const HeroSolutionDialog: React.FC<HeroSolutionDialogProps> = ({
  title,
  description,
  checks,
}) => {
  return (
    <Dialog>
      <DialogTrigger>
        <div>Ver Mais</div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div>
          <p>{description}</p>
          <HeroSolutionChecks checks={checks} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HeroSolutionDialog;
