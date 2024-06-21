"use client";

import React, { useEffect, useState } from "react";
import { api, type RouterInputs, type RouterOutputs } from "~/trpc/react";
import TipCommentItem from "./TipCommentItem";
import TipCommentSkeleton from "./TipCommentSkeleton";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "~/components/ui/spinner";

interface TipCommentsProps {
  tipId: string;
}

type CommentsProps = RouterOutputs["comment"]["getCommentsForTip"]["comments"];
type CommentInput = RouterInputs["comment"]["getCommentsForTip"];
export type TipCommentItemProps =
  RouterOutputs["comment"]["getCommentsForTip"]["comments"][number];

const TipComments: React.FC<TipCommentsProps> = ({ tipId }) => {
  const [commentInput, setCommentInput] = React.useState<CommentInput>({
    tipId,
    cursor: undefined,
    limit: 5,
  });

  const {
    data: commentPage,
    isLoading,
    hasNextPage,
    fetchNextPage,
  } = api.comment.getCommentsForTip.useInfiniteQuery(
    {
      ...commentInput,
    },
    { getNextPageParam: (lastPage) => lastPage.nextCursor },
  );

  const [comments, setComments] = useState<CommentsProps>([]);

  useEffect(() => {
    if (commentPage) {
      setComments(commentPage.pages.flatMap((page) => page.comments));
    }
  }, [commentPage]);

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
