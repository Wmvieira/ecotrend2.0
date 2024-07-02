import Image from "next/image";
import React, { use } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { api } from "~/trpc/react";

interface UserProfileProps {
  id: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ id }) => {
  const { data: author, isLoading: userLoading } = api.user.getAuthor.useQuery({
    id,
  });

  const username =
    author?.username ?? `${author?.firstName} ${author?.lastName}`;

  return (
    <div className="flex w-full flex-col justify-center gap-2">
      {userLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <Avatar className="mx-auto h-28 w-28 text-lg">
            <AvatarImage src={author?.imageUrl} alt={username ?? ""} />
            <AvatarFallback>{username ? username[0] : "EC"}</AvatarFallback>
          </Avatar>
          <h3 className="mx-auto text-3xl md:text-base">{username}</h3>
        </>
      )}
    </div>
    // <div className="flex h-28 w-28 flex-col justify-center gap-2 md:h-48 md:w-48">
    //   <div className="relative mx-auto h-20 w-20 md:h-36 md:w-36">
    //     <TooltipProvider>
    //       <Tooltip>
    //         <TooltipTrigger asChild>
    //           <Avatar

    //             className="rounded-full"
    //             style={{ objectFit: "cover" }}
    //           />
    //         </TooltipTrigger>
    //         <TooltipContent>
    //           <p>{author?.username ?? author?.firstName}</p>
    //         </TooltipContent>
    //       </Tooltip>
    //     </TooltipProvider>
    //   </div>
    //   <h3 className="text-xs md:text-base">
    //     {author?.username ?? author?.firstName}
    //   </h3>
    // </div>
  );
};

export default UserProfile;
