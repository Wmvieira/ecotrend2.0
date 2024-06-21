import React from "react";
import { Skeleton } from "~/components/ui/skeleton";

const TipRateItemSkeleton: React.FC = () => {
  return (
    <>
      <Skeleton className="h-12 w-12 rounded-full bg-primary/30" />
      <Skeleton className="h-12 w-12 rounded-full bg-primary/30" />
    </>
  );
};

export default TipRateItemSkeleton;
