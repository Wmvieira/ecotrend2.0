import React from "react";

interface TipActionButtonItemProps {
  icon: React.ReactNode;
  onClick?: () => void;
}

const TipActionButtonItem: React.FC<TipActionButtonItemProps> = ({
  icon,
  onClick,
}) => {
  return (
    <div className={`cursor-pointer p-2`} onClick={onClick}>
      <div className="h-8 w-8">{icon}</div>
    </div>
  );
};

export default TipActionButtonItem;
