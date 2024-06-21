import React, { useEffect } from "react";
import { type TipPostTrendingProps } from "./TipPostCard";
import RatingIcon from "../../rating/RatingIcon";
import TipRateDialog from "./TipRating/TipRateDialog";

const TipPostTrending: React.FC<TipPostTrendingProps> = ({ rates, id }) => {
  const [totalRating, setTotalRating] = React.useState(0);
  const [positive, setPositive] = React.useState(false);

  useEffect(() => {
    const positive = rates?.filter((rate) => rate.positive).length;
    const negative = rates?.filter((rate) => !rate.positive).length;

    setTotalRating(positive - negative);
    setPositive(positive >= negative);
  }, [rates]);

  return (
    <TipRateDialog
      tipId={id}
      trigger={
        <div className="absolute -bottom-10 -right-10 -rotate-45 md:-bottom-16 md:-right-16 lg:-bottom-12 lg:-right-12">
          <div className="relative">
            <div className="h-36 w-36 md:h-40 md:w-40">
              <RatingIcon positive={positive} fillColor={true} />
            </div>
            <div className="absolute top-[3.5em] flex w-full justify-center rounded-md bg-background md:top-[3.9em]">
              <span
                className={`p-0 text-2xl ${positive ? "text-primary" : "text-yellow-500"}`}
              >
                {Math.abs(totalRating)}
              </span>
            </div>
          </div>
        </div>
      }
    />
  );
};

export default TipPostTrending;
