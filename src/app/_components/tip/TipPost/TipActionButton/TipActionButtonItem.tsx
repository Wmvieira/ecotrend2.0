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
      className={`p-0 text-2xl ${checked ? checkedClass : ""}`}
      variant="ghost"
      onClick={onClick}
    >
      {icon}
    </Button>
  );
};

export default TipActionButtonItem;
