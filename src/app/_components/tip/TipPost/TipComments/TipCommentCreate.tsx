import React, { useState } from "react";
import { type TipCommentCreateProps } from "./TipCommentsDrawer";
import { Textarea } from "~/components/ui/textarea";
import { Button } from "~/components/ui/button";
import { FaPaperPlane } from "react-icons/fa6";

const TipCommentCreate: React.FC<TipCommentCreateProps> = ({ tipId }) => {
  const [comment, setComment] = useState("");

  const handleCommentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setComment(event.target.value);
  };

  const handleSubmit = () => {
    setComment("");
  };

  return (
    <div className="flex flex-row gap-2">
      <Textarea
        placeholder="Escreva seu comentário"
        value={comment}
        onChange={handleCommentChange}
      />
      <div className="mt-auto">
        <Button onClick={handleSubmit}>
          <FaPaperPlane />
        </Button>
      </div>
    </div>
  );
};

export default TipCommentCreate;
