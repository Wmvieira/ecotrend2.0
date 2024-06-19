import React from "react";
import { PiChatCircle } from "react-icons/pi";
import TipOpenComments from "../TipComments/TipOpenComments";

interface TipCommentButtonProps {
  tipId: string;
}

const TipCommentButton: React.FC<TipCommentButtonProps> = ({ tipId }) => {
  return (
    <TipOpenComments
      tipId={tipId}
      trigger={
        <div className="my-auto">
          <div className="p-0 text-2xl">{<PiChatCircle />}</div>
        </div>
      }
    />
  );
};

export default TipCommentButton;
