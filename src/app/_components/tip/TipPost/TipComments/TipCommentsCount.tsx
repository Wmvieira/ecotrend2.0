import React from "react";
import { type TipCommentsCountProps } from "../TipPostCard";
import TipOpenComments from "./TipOpenComments";

const TipCommentsCount: React.FC<TipCommentsCountProps> = ({ id, count }) => {
  return (
    <div>
      <TipOpenComments
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
