import React from "react";
import { type TipCommentItemProps } from "./TipComments";
import TipCommentItemAuthor from "./TipCommentItemAuthor";
import TipCommentItemInfo from "./TipCommentItemInfo";
import TipCommentContent from "./TipCommentContent";

export type TipCommentItemAuthorProps = {
  author: TipCommentItemProps["author"];
};
export type TipCommentItemInfoProps = {
  author: TipCommentItemProps["author"];
  createdAt: TipCommentItemProps["createdAt"];
};
export type TipCommentContentProps = {
  content: TipCommentItemProps["content"];
};

const TipCommentItem: React.FC<TipCommentItemProps> = ({
  id,
  author,
  content,
  createdAt,
}) => {
  return (
    <div className="flex w-full flex-row gap-2">
      <TipCommentItemAuthor author={author} />
      <div className="flex flex-col gap-1">
        <TipCommentItemInfo author={author} createdAt={createdAt} />
        <TipCommentContent content={content} />
      </div>
    </div>
  );
};

export default TipCommentItem;
