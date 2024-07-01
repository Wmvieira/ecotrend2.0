"use client";

import React, { useEffect, useState } from "react";
import TipPostCard from "~/app/_components/tip/TipPost/TipPostCard";
import TipPostSkeleton from "~/app/_components/tip/TipPost/TipPostSkeleton";
import { api, type RouterOutputs } from "~/trpc/react";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "~/components/ui/spinner";
import HeaderSearch from "~/app/dashboard/_component/layout/Header/HeaderSearch";

type TipsProps = RouterOutputs["tip"]["getTips"]["tips"];

const Tips = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const {
    data: tipPages,
    isLoading,
    hasNextPage,
    fetchNextPage,
  } = api.tip.getTips.useInfiniteQuery(
    { limit: 3, searchTerm },
    { getNextPageParam: (lastPage) => lastPage.nextCursor },
  );

  const [tips, setTips] = useState<TipsProps>([]);

  useEffect(() => {
    if (tipPages) {
      setTips(tipPages.pages.flatMap((page) => page.tips));
    }
  }, [tipPages]);

  return (
    <div>
      <HeaderSearch onSearch={handleSearch} />
      <InfiniteScroll
        dataLength={tips?.length ?? 0}
        hasMore={hasNextPage}
        next={fetchNextPage}
        loader={<Spinner />}
        className="flex flex-col justify-center gap-5 p-2"
        scrollableTarget="feedScroll"
      >
        {isLoading && <TipPostSkeleton />}
        {tips?.map((tip) => (
          <TipPostCard key={tip.id} {...tip} />
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default Tips;
