import React from "react";
import { type TipPostedTimeProps } from "./TipPostCard";
import dayjs from "~/lib/dayjs";

const TipPostedTime: React.FC<TipPostedTimeProps> = ({ createdAt }) => {
  return <span className="my-auto text-xs">{dayjs(createdAt).fromNow()}</span>;
};

export default TipPostedTime;
