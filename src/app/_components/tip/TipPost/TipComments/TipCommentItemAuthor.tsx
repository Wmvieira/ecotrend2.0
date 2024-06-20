import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { type TipCommentItemAuthorProps } from "./TipCommentItem";

const TipCommentItemAuthor: React.FC<TipCommentItemAuthorProps> = ({
  author,
}) => {
  return (
    <Avatar className="h-10 w-10">
      <AvatarImage
        src={author.imageUrl ?? undefined}
        alt={author.username ?? undefined}
      />
      <AvatarFallback className="uppercase">
        {author.username?.charAt(0) ?? "EC"}
      </AvatarFallback>
    </Avatar>
  );
};

export default TipCommentItemAuthor;
