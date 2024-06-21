import React from "react";
import { PiButterfly, PiBiohazard } from "react-icons/pi";

interface RatingIconProps {
  positive: boolean;
  fillColor: boolean;
}

const RatingIcon: React.FC<RatingIconProps> = ({ positive, fillColor }) => {
  return (
    <>
      {positive ? (
        <PiButterfly
          className={`h-full w-full ${fillColor ? "text-primary" : ""}`}
        />
      ) : (
        <PiBiohazard
          className={`h-full w-full ${fillColor ? "text-yellow-500" : ""}`}
        />
      )}
    </>
  );
};

export default RatingIcon;
