"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { api, type RouterOutputs } from "~/trpc/react";
import TipRateInfo from "./TipRateInfo";

type RateProps = RouterOutputs["rate"]["getAllForTip"]["rates"];

export type TipRateItemProps = RateProps[number];

export type TipRateInfoProps = {
  comments: RateProps;
  isLoading: boolean;
  hasNextPage: boolean;
  fetchNextPage: () => void;
};

interface TipRateDialogProps {
  tipId: string;
  trigger: React.ReactNode;
}
const TipRateDialog: React.FC<TipRateDialogProps> = ({ tipId, trigger }) => {
  const {
    data: ratePage,
    isLoading,
    hasNextPage,
    fetchNextPage,
  } = api.rate.getAllForTip.useInfiniteQuery(
    {
      tipId,
    },
    { getNextPageParam: (lastPage) => lastPage.nextCursor },
  );

  const [rates, setrates] = useState<RateProps>([]);

  useEffect(() => {
    if (ratePage) {
      setrates(ratePage.pages.flatMap((page) => page.rates));
    }
  }, [ratePage]);

  return (
    <Dialog>
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Curtidas</DialogTitle>
        </DialogHeader>
        <div className="h-64 overflow-scroll" id="rateScroll">
          <TipRateInfo
            comments={rates}
            isLoading={isLoading}
            hasNextPage={hasNextPage}
            fetchNextPage={fetchNextPage}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TipRateDialog;
