import React from "react";

import TipActionButtonItem from "./TipActionButtonItem";
import { type TipActionsButtonProps } from "../TipPostCard";
import TipCommentButton from "./TipCommentButton";
import RatingIcon from "~/app/_components/rating/RatingIcon";

const TipActionsButton: React.FC<TipActionsButtonProps> = ({ id }) => {
  return (
    <div className="flex flex-row gap-5">
      <TipActionButtonItem
        icon={<RatingIcon positive={true} fillColor={false} />}
        onClick={() => console.log("Edit")}
        checked={false}
        checkedClass="text-green-500"
      />
      <TipActionButtonItem
        icon={<RatingIcon positive={false} fillColor={false} />}
        onClick={() => console.log("Edit")}
        checked={false}
        checkedClass="text-red-700"
      />
      <TipCommentButton tipId={id} />
    </div>
  );
};

export default TipActionsButton;
