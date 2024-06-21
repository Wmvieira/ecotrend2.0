/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import TipActionButtonItem from "./TipActionButtonItem";
import { type TipActionsButtonProps } from "../TipPostCard";
import TipCommentButton from "./TipCommentButton";
import RatingIcon from "~/app/_components/rating/RatingIcon";
import { api } from "~/trpc/react";
import { useSession } from "@clerk/nextjs";

const TipActionsButton: React.FC<TipActionsButtonProps> = ({
  id,
  rates,
  setRates,
}) => {
  const { mutate: rateTip } = api.rate.reateTip.useMutation({
    onSuccess: (rate) => {
      if (rate) {
        setMyRate(rate.positive);
        setRates([...removeRate(), rate]);
      } else {
        setMyRate(undefined);
        setRates(removeRate());
      }
    },
  });

  const [myRate, setMyRate] = React.useState<boolean>();

  const user = useSession();

  useEffect(() => {
    if (user) {
      const rated = rates?.find(
        (rate) => rate.authorId === user.session?.user.id,
      );
      if (rated) {
        setMyRate(rated.positive);
      }
    }
    // should run only when the component mounts
  }, []);

  const removeRate = () =>
    rates.filter((rate) => rate.authorId !== user.session?.user.id);

  const handleRateClick = (positive: boolean) => {
    if (positive === myRate) {
      setMyRate(undefined);
    } else {
      setMyRate(positive);
    }
    rateTip({ tipId: id, positive });
  };

  return (
    <div className="flex flex-row gap-5">
      <TipActionButtonItem
        icon={<RatingIcon positive={true} fillColor={myRate == true} />}
        onClick={() => handleRateClick(true)}
      />
      <TipActionButtonItem
        icon={<RatingIcon positive={false} fillColor={myRate == false} />}
        onClick={() => handleRateClick(false)}
      />
      <TipCommentButton tipId={id} />
    </div>
  );
};

export default TipActionsButton;
