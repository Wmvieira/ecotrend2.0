import React from "react";
import { type TipCommentsCountProps } from "../TipPostCard";
import TipCommentsDrawer from "./TipCommentsDrawer";

const TipCommentsCount: React.FC<TipCommentsCountProps> = ({ id, count }) => {
  return (
    <div>
      <TipCommentsDrawer
        tipId={id}
        trigger={
          <span className="text-xm hover:text-gray-700">
            ver os {count} comentários
          </span>
        }
      />
    </div>
  );
};

export default TipCommentsCount;
