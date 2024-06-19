import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "~/components/ui/card";
import { type RouterOutputs } from "~/trpc/react";
import TipAuthor from "./TipAuthor";
import TipPostedTime from "./TipPostedTime";
import TipPostContent from "./TipPostContent";
import TipActionsButton from "./TipActionButton/TipActionsButton";
import TipCommentsCount from "./TipComments/TipCommentsCount";
import TipPostTrending from "./TipPostTrending";

type TipPostProps = RouterOutputs["tip"]["getTips"]["tips"][number];
export type TipAuthorProps = TipPostProps["user"];
export type TipPostedTimeProps = TipPostProps["createdAt"];
export type TipPostContentProps = {
  content: TipPostProps["content"];
  title: TipPostProps["title"];
};
export type TipActionsButtonProps = {
  id: TipPostProps["id"];
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
  user,
  id,
  createdAt,
  ratings,
  _count,
}) => {
  return (
    <Card className="relative overflow-hidden">
      <CardHeader>
        <div className="flex flex-row justify-between">
          <TipAuthor {...user} />
          <TipPostedTime {...createdAt} />
        </div>
      </CardHeader>
      <CardContent>
        <TipPostContent content={content} title={title} />
      </CardContent>
      <CardFooter className="py-2">
        <div className="flex w-full flex-col justify-start">
          <TipActionsButton id={id} />
          <TipCommentsCount id={id} count={_count.comments} />
        </div>
      </CardFooter>
      <TipPostTrending ratings={ratings} />
    </Card>
  );
};

export default TipPostCard;