import React from "react";
import { type TipPostContentProps } from "./TipPostCard";

const TipPostContent: React.FC<TipPostContentProps> = ({ content, title }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="flex flex-col gap-2 transition-all">
      <h2 className="text-2xl font-bold">{title}</h2>
      <p
        className={`z-30 ${open ? "" : "max-h-52 overflow-scroll"}`}
        onClick={() => setOpen(!open)}
      >
        {content}
      </p>
    </div>
  );
};

export default TipPostContent;
