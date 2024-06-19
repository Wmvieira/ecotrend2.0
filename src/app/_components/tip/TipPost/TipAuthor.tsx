import React from "react";
import { type TipAuthorProps } from "./TipPostCard";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

const TipAuthor: React.FC<TipAuthorProps> = ({ avatar, id, username }) => {
  return (
    <Link className="my-auto flex" href={`/search/user/${id}`}>
      <div className="flex flex-row gap-2">
        <Avatar className="h-8 w-8 text-sm">
          <AvatarImage src={avatar ?? undefined} alt={username ?? undefined} />
          <AvatarFallback>{username ? username[0] : "EC"}</AvatarFallback>
        </Avatar>
        <span className="my-auto text-sm">{username}</span>
      </div>
    </Link>
  );
};

export default TipAuthor;
