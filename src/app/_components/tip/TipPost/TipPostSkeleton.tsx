import React from "react";
import { Skeleton } from "~/components/ui/skeleton";

const TipPostSkeleton: React.FC = () => {
  return (
    <>
      <Skeleton className="h-52 w-full bg-primary/30" />
      <Skeleton className="h-52 w-full bg-primary/30" />
      <Skeleton className="h-52 w-full bg-primary/30" />
    </>
  );
};

export default TipPostSkeleton;
