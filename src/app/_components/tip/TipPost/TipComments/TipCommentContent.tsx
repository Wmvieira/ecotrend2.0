import React from "react";
import { type TipCommentContentProps } from "./TipCommentItem";

const TipCommentContent: React.FC<TipCommentContentProps> = ({ content }) => {
  return <p className="w-full">{content}</p>;
};

export default TipCommentContent;
