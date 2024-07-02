// components/ui/UserAvatar.tsx
import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "~/components/ui/avatar";

interface UserAvatarProps {
  imageUrl: string;
  username: string | null;
  fullName?: string | null;
  email?: string | null;
}

const UserAvatar: React.FC<UserAvatarProps> = ({
  imageUrl,
  username,
  fullName,
  email,
}) => {
  return (
    <div className="my-4 flex items-center space-x-4">
      <Avatar className="h-16 w-16">
        <AvatarImage src={imageUrl} alt={username ?? "Avatar"} />
        <AvatarFallback>{username ? username[0] : "?"}</AvatarFallback>
      </Avatar>
      <div>
        <h2 className="text-xl font-semibold">{fullName ?? username}</h2>
        {email && <p className="text-gray-600">{email}</p>}
      </div>
    </div>
  );
};

export default UserAvatar;
