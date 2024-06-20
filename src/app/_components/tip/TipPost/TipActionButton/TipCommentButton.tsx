import React from "react";
import { PiChatCircle } from "react-icons/pi";
import TipCommentsDrawer from "../TipComments/TipCommentsDrawer";

interface TipCommentButtonProps {
  tipId: string;
}

const TipCommentButton: React.FC<TipCommentButtonProps> = ({ tipId }) => {
  return (
    <TipCommentsDrawer
      tipId={tipId}
      trigger={
        <div className="my-auto">
          <div className="p-0">{<PiChatCircle className="h-8 w-8" />}</div>
        </div>
      }
    />
  );
};

export default TipCommentButton;
