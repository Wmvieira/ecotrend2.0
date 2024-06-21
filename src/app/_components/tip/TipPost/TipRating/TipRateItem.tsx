import React from "react";
import { type TipRateItemProps } from "./TipRateDialog";
import TipRateItemAuthor from "./TipRateItemAuthor";
import RatingIcon from "~/app/_components/rating/RatingIcon";
import { Separator } from "@radix-ui/react-separator";

export type TipRateItemAuthorProps = {
  author: TipRateItemProps["author"];
  createdAt: TipRateItemProps["createdAt"];
};

const TipRateItem: React.FC<TipRateItemProps> = ({
  author,
  createdAt,
  positive,
}) => {
  return (
    <div className="flex flex-row justify-between gap-2 p-2">
      <TipRateItemAuthor author={author} createdAt={createdAt} />
      <Separator className="" />
      <div className="h-10 w-10">
        <RatingIcon positive={positive} fillColor />
      </div>
    </div>
  );
};

export default TipRateItem;
