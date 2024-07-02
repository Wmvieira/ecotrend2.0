"use client";

import React from "react";
import { useParams } from "next/navigation";
import Tips from "~/app/dashboard/_component/page/Tips/Tips";
import UserProfile from "./_components/UserProfile";

export default function UserPage() {
  const params = useParams();
  const { id } = params as { id: string };
  return (
    <div className="flex flex-col gap-2">
      <div>
        <UserProfile id={id} />
      </div>
      <div className="flex flex-col justify-center md:px-14">
        <Tips userId={id} />
      </div>
    </div>
  );
}
