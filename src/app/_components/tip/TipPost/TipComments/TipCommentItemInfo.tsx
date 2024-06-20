import React from "react";
import { type TipCommentItemInfoProps } from "./TipCommentItem";
import dayjs from "~/lib/dayjs";

const TipCommentItemInfo: React.FC<TipCommentItemInfoProps> = ({
  author,
  createdAt,
}) => {
  return (
    <div className="flex flex-row gap-1">
      <span>{author.username}</span>
      <span className="my-auto text-xs text-primary-foreground/60">
        {dayjs(createdAt).fromNow()}
      </span>
    </div>
  );
};

export default TipCommentItemInfo;
