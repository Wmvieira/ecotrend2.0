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

export type TipPostAuthorProps = { author: TipPostProps["author"] };
export type TipPostedTimeProps = { createdAt: TipPostProps["createdAt"] };
export type TipPostContentProps = {
  content: TipPostProps["content"];
  title: TipPostProps["title"];
};
export type TipActionsButtonProps = {
  id: TipPostProps["id"];
  rates: TipPostProps["rates"];
  setRates: (rates: TipPostProps["rates"]) => void;
};
export type TipCommentsCountProps = {
  id: TipPostProps["id"];
  count: number;
};
export type TipPostTrendingProps = {
  id: TipPostProps["id"];
  rates: TipPostProps["rates"];
};

const TipPostCard: React.FC<TipPostProps> = ({
  title,
  content,
  author,
  id,
  createdAt,
  rates,
  _count,
}) => {
  const [newRates, setNewRates] = useState(rates);

  return (
    <Card className="relative overflow-hidden">
      <CardHeader>
        <div className="flex flex-row justify-between">
          <TipPostAuthor author={author} />
          <TipPostedTime createdAt={createdAt} />
        </div>
      </CardHeader>
      <CardContent>
        <TipPostContent content={content} title={title} />
      </CardContent>
      <CardFooter className="py-2">
        <div className="flex w-full flex-col justify-start">
          <TipActionsButton id={id} rates={newRates} setRates={setNewRates} />
          <TipCommentsCount id={id} count={_count.comments} />
        </div>
      </CardFooter>
      <TipPostTrending rates={newRates} id={id} />
    </Card>
  );
};

export default TipPostCard;
