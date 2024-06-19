import React from "react";
import { PiButterfly, PiBiohazard } from "react-icons/pi";
import TipActionButtonItem from "./TipActionButtonItem";
import { type TipActionsButtonProps } from "../TipPostCard";
import TipCommentButton from "./TipCommentButton";

const TipActionsButton: React.FC<TipActionsButtonProps> = ({ id }) => {
  return (
    <div className="flex flex-row gap-5">
      <TipActionButtonItem
        icon={<PiButterfly />}
        onClick={() => console.log("Edit")}
        checked={false}
        checkedClass="text-green-500"
      />
      <TipActionButtonItem
        icon={<PiBiohazard />}
        onClick={() => console.log("Edit")}
        checked={false}
        checkedClass="text-red-700"
      />
      <TipCommentButton tipId={id} />
    </div>
  );
};

export default TipActionsButton;
