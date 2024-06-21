"use client";

import React, { useEffect, useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "~/components/ui/drawer";
import TipComments from "./TipComments";
import TipCommentCreate from "./TipCommentCreate";
import { api, type RouterOutputs } from "~/trpc/react";

type CommentsProps = RouterOutputs["comment"]["getCommentsForTip"]["comments"];
export type TipCommentsProps = {
  comments: CommentsProps;
  isLoading: boolean;
  hasNextPage: boolean;
  fetchNextPage: () => void;
};
export type TipCommentItemProps =
  RouterOutputs["comment"]["getCommentsForTip"]["comments"][number];

interface TipCommentsDrawerProps {
  tipId: string;
  trigger: React.ReactNode;
}

export type TipCommentCreateProps = {
  tipId: TipCommentsDrawerProps["tipId"];
  setNewComment: (comment: CommentsProps[number]) => void;
};

const TipCommentsDrawer: React.FC<TipCommentsDrawerProps> = ({
  tipId,
  trigger,
}) => {
  const {
    data: commentPage,
    isLoading,
    hasNextPage,
    fetchNextPage,
  } = api.comment.getCommentsForTip.useInfiniteQuery(
    {
      tipId,
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
    <Drawer>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="md:text-2xl">
            Comentários da Publicação
          </DrawerTitle>
        </DrawerHeader>
        <div className="h-52 overflow-scroll" id="commentScroll">
          <TipComments
            comments={comments}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
            isLoading={isLoading}
          />
        </div>
        <DrawerFooter>
          <TipCommentCreate
            tipId={tipId}
            setNewComment={(comment) => setComments([comment, ...comments])}
          />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default TipCommentsDrawer;
