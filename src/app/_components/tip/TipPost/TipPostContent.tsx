import React from "react";
import { type TipPostContentProps } from "./TipPostCard";

const TipPostContent: React.FC<TipPostContentProps> = ({ content }) => {
  return (
    <div>
      <p className="text-sm">{content}</p>
    </div>
  );
};

export default TipPostContent;
