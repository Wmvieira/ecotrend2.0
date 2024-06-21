"use client";

import React, { useEffect, useState } from "react";
import TipPostCard from "~/app/_components/tip/TipPost/TipPostCard";
import TipPostSkeleton from "~/app/_components/tip/TipPost/TipPostSkeleton";
import { api, type RouterOutputs } from "~/trpc/react";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "~/components/ui/spinner";

type TipsProps = RouterOutputs["tip"]["getTips"]["tips"][number][];

const Tips = () => {
  const {
    data: tipPages,
    isLoading,
    hasNextPage,
    fetchNextPage,
  } = api.tip.getTips.useInfiniteQuery(
    { limit: 3 },
    { getNextPageParam: (lastPage) => lastPage.nextCursor },
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
      className="flex flex-col justify-center gap-5 overflow-scroll p-2"
      scrollableTarget="feedScroll"
    >
      {isLoading && <TipPostSkeleton />}
      {tips?.map((tip) => <TipPostCard key={tip.id} {...tip} />)}
    </InfiniteScroll>
  );
};

export default Tips;
