import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { type TipCommentItemAuthorProps } from "./TipCommentItem";
import Link from "next/link";

const TipCommentItemAuthor: React.FC<TipCommentItemAuthorProps> = ({
  author,
}) => {
  return (
    <Avatar className="h-10 w-10">
      <Link href={`/dashboard/search/user/${author.id}`}>
        <AvatarImage
          src={author.imageUrl ?? undefined}
          alt={author.username ?? undefined}
        />
        <AvatarFallback className="uppercase">
          {author.username?.charAt(0) ?? "EC"}
        </AvatarFallback>
      </Link>
    </Avatar>
  );
};

export default TipCommentItemAuthor;
