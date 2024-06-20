import React from "react";
import { api, type RouterInputs, type RouterOutputs } from "~/trpc/react";
import TipCommentItem from "./TipCommentItem";
import TipCommentSkeleton from "./TipCommentSkeleton";

interface TipCommentsProps {
  tipId: string;
}

type CommentInput = RouterInputs["comment"]["getCommentsForTip"];
export type TipCommentItemProps =
  RouterOutputs["comment"]["getCommentsForTip"]["comments"][number];

const TipComments: React.FC<TipCommentsProps> = ({ tipId }) => {
  const [commentInput, setCommentInput] = React.useState<CommentInput>({
    tipId,
    cursor: undefined,
    limit: 3,
  });

  const { data: commentPage, isLoading } =
    api.comment.getCommentsForTip.useInfiniteQuery(
      {
        ...commentInput,
      },
      { getNextPageParam: (lastPage) => lastPage.nextCursor },
    );

  const comments = commentPage?.pages.flatMap((page) => page.comments);

  return (
    <div className="flex max-h-64 flex-row gap-2 overflow-scroll p-3">
      <div className="flex flex-col gap-10">
        {comments?.map((comment) => (
          <TipCommentItem key={comment.id} {...comment} />
        ))}
        {isLoading && <TipCommentSkeleton />}
      </div>
    </div>
  );
};

export default TipComments;
