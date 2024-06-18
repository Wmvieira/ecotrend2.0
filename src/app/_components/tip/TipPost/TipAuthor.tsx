import React from "react";
import { type TipAuthorProps } from "./TipPostCard";
import Link from "next/link";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

const TipAuthor: React.FC<TipAuthorProps> = ({ avatar, id, username }) => {
  return (
    <div className="my-auto flex text-sm">
      <span>
        <Popover>
          <PopoverTrigger>
            <span className="font-bold text-muted-foreground">{username}</span>
          </PopoverTrigger>
          <PopoverContent className="w-fit">
            <Link
              className="flex flex-row items-center gap-2 font-bold text-muted-foreground"
              href={`/search/user/${id}`}
            >
              <Avatar>
                <AvatarImage
                  src={avatar ?? undefined}
                  alt={username ?? undefined}
                />
                <AvatarFallback>{username ? username[0] : "EC"}</AvatarFallback>
              </Avatar>
              <span>{username}</span>
            </Link>
          </PopoverContent>
          {/* <Link
            href={`/search/user/${id}`}
            className="font-bold text-muted-foreground"
          >
            {username}
          </Link> */}
        </Popover>
      </span>
    </div>
  );
};

export default TipAuthor;
