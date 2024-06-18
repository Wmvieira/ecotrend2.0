import Image from "next/image";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";

interface CompanyMemberItemProps {
  name: string;
  image: string;
}

const CompanyMemberItem: React.FC<CompanyMemberItemProps> = ({
  name,
  image,
}) => {
  return (
    <li className="flex h-28 w-28 flex-col justify-center gap-2 md:h-48 md:w-48">
      <div className="relative mx-auto h-20 w-20 md:h-36 md:w-36">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Image
                fill
                src={image}
                alt={name}
                className="rounded-full"
                style={{ objectFit: "cover" }}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>{name}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <h3 className="text-xs md:text-base">{name}</h3>
    </li>
  );
};

export default CompanyMemberItem;
