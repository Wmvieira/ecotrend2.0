import React, { useEffect } from "react";
import { PiBiohazard, PiButterfly } from "react-icons/pi";
import { type TipPostTrendingProps } from "./TipPostCard";

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
    <div className="absolute -bottom-6 -right-6 -rotate-45 md:-bottom-16 md:-right-16 lg:-bottom-20 lg:-right-20">
      <div className="relative">
        {positive ? (
          <PiButterfly className="h-48 w-48 text-green-500" />
        ) : (
          <PiBiohazard className="h-48 w-48 text-red-500" />
        )}
        <div className="absolute top-[5.5em] flex w-full justify-center rounded-md bg-background">
          <span
            className={`p-0 text-2xl ${positive ? "text-green-500" : "text-red-500"}`}
          >
            {Math.abs(totalRating)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TipPostTrending;
