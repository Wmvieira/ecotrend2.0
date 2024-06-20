"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "~/components/ui/card";
import { type RouterOutputs } from "~/trpc/react";
import TipPostedTime from "./TipPostedTime";
import TipPostContent from "./TipPostContent";
import TipActionsButton from "./TipActionButton/TipActionsButton";
import TipCommentsCount from "./TipComments/TipCommentsCount";
import TipPostTrending from "./TipPostTrending";
import TipPostAuthor from "./TipPostAuthor";

type TipPostProps = RouterOutputs["tip"]["getTips"]["tips"][number];

export type TipPostAuthorProps = TipPostProps["author"];
export type TipPostedTimeProps = TipPostProps["createdAt"];
export type TipPostContentProps = {
  content: TipPostProps["content"];
  title: TipPostProps["title"];
};
export type TipActionsButtonProps = {
  id: TipPostProps["id"];
  ratings: TipPostProps["ratings"];
  setRatings: (ratings: TipPostProps["ratings"]) => void;
};
export type TipCommentsCountProps = {
  id: TipPostProps["id"];
  count: number;
};
export type TipPostTrendingProps = {
  ratings: TipPostProps["ratings"];
};

const TipPostCard: React.FC<TipPostProps> = ({
  title,
  content,
  author,
  id,
  createdAt,
  ratings,
  _count,
}) => {
  const [newRatings, setNewRatings] = useState(ratings);

  return (
    <Card className="relative overflow-hidden">
      <CardHeader>
        <div className="flex flex-row justify-between">
          <TipPostAuthor {...author} />
          <TipPostedTime {...createdAt} />
        </div>
      </CardHeader>
      <CardContent>
        <TipPostContent content={content} title={title} />
      </CardContent>
      <CardFooter className="py-2">
        <div className="flex w-full flex-col justify-start">
          <TipActionsButton
            id={id}
            ratings={newRatings}
            setRatings={setNewRatings}
          />
          <TipCommentsCount id={id} count={_count.comments} />
        </div>
      </CardFooter>
      <TipPostTrending ratings={newRatings} />
    </Card>
  );
};

export default TipPostCard;
