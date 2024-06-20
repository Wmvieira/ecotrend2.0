import React, { useEffect } from "react";
import { type TipPostTrendingProps } from "./TipPostCard";
import RatingIcon from "../../rating/RatingIcon";

const TipPostTrending: React.FC<TipPostTrendingProps> = ({ ratings }) => {
  const [totalRating, setTotalRating] = React.useState(0);
  const [positive, setPositive] = React.useState(false);

  useEffect(() => {
    const positive = ratings?.filter((rating) => rating.positive).length;
    const negative = ratings?.filter((rating) => !rating.positive).length;

    setTotalRating(positive - negative);
    setPositive(positive >= negative);
  }, [ratings]);

  return (
    <div className="absolute -bottom-10 -right-10 -rotate-45 md:-bottom-16 md:-right-16 lg:-bottom-12 lg:-right-12">
      <div className="relative">
        <div className="h-36 w-36">
          <RatingIcon positive={positive} fillColor={true} />
        </div>
        <div className="absolute top-[3.5em] flex w-full justify-center rounded-md bg-background">
          <span
            className={`p-0 text-2xl ${positive ? "text-green-500" : "text-yellow-500"}`}
          >
            {Math.abs(totalRating)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TipPostTrending;
