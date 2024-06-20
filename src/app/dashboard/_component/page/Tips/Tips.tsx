"use client";

import React from "react";
import TipPostCard from "~/app/_components/tip/TipPost/TipPostCard";
import TipPostSkeleton from "~/app/_components/tip/TipPost/TipPostSkeleton";
import { api } from "~/trpc/react";

const Tips = () => {
  const { data: tipPages, isLoading } = api.tip.getTips.useInfiniteQuery(
    { limit: 10 },
    { getNextPageParam: (lastPage) => lastPage.nextCursor },
  );

  const tips = tipPages?.pages.flatMap((page) => page.tips);

  return (
    <div className="flex flex-col justify-center gap-5 p-2">
      {tips?.map((tip) => <TipPostCard {...tip} key={tip.id} />)}
      {isLoading && <TipPostSkeleton />}
    </div>
  );
};

export default Tips;
