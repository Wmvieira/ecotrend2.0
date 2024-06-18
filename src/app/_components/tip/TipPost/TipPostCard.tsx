import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { type RouterOutputs } from "~/trpc/react";
import TipAuthor from "./TipAuthor";
import TipPostedTime from "./TipPostedTime";
import TipPostContent from "./TipPostContent";

type TipPostProps = RouterOutputs["tip"]["getTips"]["tips"][number];
export type TipAuthorProps = TipPostProps["user"];
export type TipPostedTimeProps = TipPostProps["createdAt"];
export type TipPostContentProps = { content: TipPostProps["content"] };

const TipPostCard: React.FC<TipPostProps> = ({
  title,
  content,
  user,
  id,
  createdAt,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-row gap-2">
          <span className="text-lg">{title}</span>
          <TipAuthor {...user} />
        </CardTitle>
        <CardDescription>
          <TipPostedTime {...createdAt} />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <TipPostContent content={content} />
      </CardContent>
    </Card>
  );
};

export default TipPostCard;
