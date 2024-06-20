import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { type TipCommentItemAuthorProps } from "./TipCommentItem";

const TipCommentItemAuthor: React.FC<TipCommentItemAuthorProps> = ({
  user,
}) => {
  return (
    <Avatar className="h-10 w-10">
      <AvatarImage
        src={user.avatar ?? undefined}
        alt={user.username ?? undefined}
      />
      <AvatarFallback className="uppercase">
        {user.username?.charAt(0) ?? "EC"}
      </AvatarFallback>
    </Avatar>
  );
};

export default TipCommentItemAuthor;
