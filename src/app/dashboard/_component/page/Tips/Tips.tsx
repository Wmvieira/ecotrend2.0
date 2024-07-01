"use client";

import React, { useEffect, useState } from "react";
import TipPostCard from "~/app/_components/tip/TipPost/TipPostCard";
import TipPostSkeleton from "~/app/_components/tip/TipPost/TipPostSkeleton";
import { api, type RouterOutputs } from "~/trpc/react";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "~/components/ui/spinner";

type TipsProps = RouterOutputs["tip"]["getTips"]["tips"];
interface TipsComponentProps {
  searchTerm?: string;
  startDate?: Date;
  endDate?: Date;
  postOrder?: boolean;
}

const Tips: React.FC<TipsComponentProps> = ({
  searchTerm,
  endDate,
  postOrder,
  startDate,
}) => {
  const {
    data: tipPages,
    isLoading,
    hasNextPage,
    fetchNextPage,
  } = api.tip.getTips.useInfiniteQuery(
    { limit: 20, searchTerm, postOrder, startDate, endDate },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      refetchInterval: 3000,
    },
  );

  const [tips, setTips] = useState<TipsProps>([]);

  useEffect(() => {
    if (tipPages) {
      setTips(tipPages.pages.flatMap((page) => page.tips));
    }
  }, [tipPages]);

  return (
    <InfiniteScroll
      dataLength={tips?.length ?? 0}
      hasMore={hasNextPage}
      next={fetchNextPage}
      loader={<Spinner />}
      className="flex flex-col justify-center gap-5"
      scrollableTarget="feedScroll"
    >
      {isLoading && <TipPostSkeleton />}
      {tips?.map((tip) => <TipPostCard key={tip.id} {...tip} />)}
    </InfiniteScroll>
  );
};

export default Tips;
