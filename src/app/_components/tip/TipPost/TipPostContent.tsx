import React from "react";
import { type TipPostContentProps } from "./TipPostCard";

const TipPostContent: React.FC<TipPostContentProps> = ({ content, title }) => {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="z-30">{content}</p>
    </div>
  );
};

export default TipPostContent;
