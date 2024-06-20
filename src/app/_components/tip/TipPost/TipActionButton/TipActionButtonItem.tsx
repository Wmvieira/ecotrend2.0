import React from "react";
import { Button } from "~/components/ui/button";

interface TipActionButtonItemProps {
  icon: React.ReactNode;
  onClick?: () => void;
  checked?: boolean;
  checkedClass?: string;
}

const TipActionButtonItem: React.FC<TipActionButtonItemProps> = ({
  icon,
  onClick,
  checked,
  checkedClass,
}) => {
  return (
    <Button
      className={`p-0 ${checked ? checkedClass : ""}`}
      variant="ghost"
      onClick={onClick}
    >
      <div className="h-8 w-8">{icon}</div>
    </Button>
  );
};

export default TipActionButtonItem;
