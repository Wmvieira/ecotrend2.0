import React from "react";
import { type TipCommentItemProps } from "./TipComments";
import TipCommentItemAuthor from "./TipCommentItemAuthor";
import TipCommentItemInfo from "./TipCommentItemInfo";
import TipCommentContent from "./TipCommentContent";

export type TipCommentItemAuthorProps = {
  user: TipCommentItemProps["user"];
};
export type TipCommentItemInfoProps = {
  user: TipCommentItemProps["user"];
  createdAt: TipCommentItemProps["createdAt"];
};
export type TipCommentContentProps = {
  content: TipCommentItemProps["content"];
};

const TipCommentItem: React.FC<TipCommentItemProps> = ({
  id,
  user,
  content,
  createdAt,
}) => {
  return (
    <div className="flex w-full flex-row gap-2">
      <TipCommentItemAuthor user={user} />
      <div className="flex flex-col gap-1">
        <TipCommentItemInfo user={user} createdAt={createdAt} />
        <TipCommentContent content={content} />
      </div>
    </div>
  );
};

export default TipCommentItem;
