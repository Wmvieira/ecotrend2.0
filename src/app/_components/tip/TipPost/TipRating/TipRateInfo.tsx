"use client";

import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "~/components/ui/spinner";
import { type TipRateInfoProps } from "./TipRateDialog";
import TipRateItemSkeleton from "./TipRateItemSkeleton";
import TipRateItem from "./TipRateItem";

const TipRateInfo: React.FC<TipRateInfoProps> = ({
  comments,
  hasNextPage,
  fetchNextPage,
  isLoading,
}) => {
  return (
    <InfiniteScroll
      dataLength={comments?.length ?? 0}
      hasMore={hasNextPage}
      next={fetchNextPage}
      loader={<Spinner />}
      className="flex flex-col gap-10 p-2"
      scrollableTarget="rateScroll"
    >
      {isLoading && <TipRateItemSkeleton />}
      {comments?.map((comment) => (
        <TipRateItem key={comment.id} {...comment} />
      ))}
    </InfiniteScroll>
  );
};

export default TipRateInfo;
