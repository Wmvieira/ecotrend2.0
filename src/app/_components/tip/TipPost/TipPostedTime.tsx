import React from "react";
import { type TipPostedTimeProps } from "./TipPostCard";
import dayjs from "~/lib/dayjs";

const TipPostedTime: React.FC<TipPostedTimeProps> = (date) => {
  const relativePostTime = dayjs(date).fromNow();

  return <span className="my-auto text-xs">{relativePostTime}</span>;
};

export default TipPostedTime;
