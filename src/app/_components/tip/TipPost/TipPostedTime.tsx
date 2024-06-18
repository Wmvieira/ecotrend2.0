import React from "react";
import { type TipPostedTimeProps } from "./TipPostCard";
import dayjs from "~/lib/dayjs";

const TipPostedTime: React.FC<TipPostedTimeProps> = (date) => {
  const relativePostTime = dayjs(date).fromNow();

  return <span>{relativePostTime}</span>;
};

export default TipPostedTime;
