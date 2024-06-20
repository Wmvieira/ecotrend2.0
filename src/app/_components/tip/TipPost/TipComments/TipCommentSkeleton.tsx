import React from "react";
import { Skeleton } from "~/components/ui/skeleton";

const TipCommentSkeleton: React.FC = () => {
  return (
    <>
      <TipCommentItemSkeleton />
      <TipCommentItemSkeleton />
    </>
  );
};
const TipCommentItemSkeleton: React.FC = () => (
  <div className="flex items-center space-x-4">
    <Skeleton className="h-12 w-12 rounded-full bg-primary/30" />
    <div className="space-y-2">
      <Skeleton className="h-4 w-[250px] bg-primary/30" />
      <Skeleton className="h-4 w-[200px] bg-primary/30" />
    </div>
  </div>
);
export default TipCommentSkeleton;
