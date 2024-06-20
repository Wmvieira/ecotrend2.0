import React from "react";
import { type TipCommentItemInfoProps } from "./TipCommentItem";
import dayjs from "~/lib/dayjs";

const TipCommentItemInfo: React.FC<TipCommentItemInfoProps> = ({
  user,
  createdAt,
}) => {
  return (
    <div className="flex flex-row gap-1">
      <span>{user.username}</span>
      <span className="my-auto text-xs text-primary-foreground/60">
        {dayjs(createdAt).fromNow()}
      </span>
    </div>
  );
};

export default TipCommentItemInfo;
