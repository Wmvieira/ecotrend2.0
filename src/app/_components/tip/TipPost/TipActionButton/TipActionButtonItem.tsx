import React from "react";

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
    <div
      className={`cursor-pointer hover:${checkedClass} p-2 ${checked ? checkedClass : ""}`}
      onClick={onClick}
    >
      <div className="h-8 w-8">{icon}</div>
    </div>
  );
};

export default TipActionButtonItem;
