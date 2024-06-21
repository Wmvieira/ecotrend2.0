"use client";

import React from "react";
import TipCommentItem from "./TipCommentItem";
import TipCommentSkeleton from "./TipCommentSkeleton";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "~/components/ui/spinner";
import { type TipCommentsProps } from "./TipCommentsDrawer";

const TipComments: React.FC<TipCommentsProps> = ({
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
      scrollableTarget="commentScroll"
    >
      {isLoading && <TipCommentSkeleton />}
      {comments?.map((comment) => (
        <TipCommentItem key={comment.id} {...comment} />
      ))}
    </InfiniteScroll>
  );
};

export default TipComments;
