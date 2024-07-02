"use client";

import React, { useEffect, useState } from "react";
import { useParams } from 'next/navigation';
import TipPostCard from '~/app/_components/tip/TipPost/TipPostCard';
import TipPostSkeleton from '~/app/_components/tip/TipPost/TipPostSkeleton';
import { api, type RouterOutputs } from '~/trpc/react';
import Spinner from '~/components/ui/spinner';

type TipsProps = RouterOutputs["tip"]["getUserTips"];

export default function UserPage() {
  const params = useParams();
  console.log("Params:", params);  // Adicione este log para verificar os parâmetros

  const { id } = params as { id: string };
  console.log("User ID:", id);  // Adicione este log para verificar o ID do usuário

  const { data: tips, isLoading, error } = api.tip.getUserTips.useQuery(id);

  useEffect(() => {
    if (tips) {
      console.log("Fetched tips for user:", tips);
    }
    if (error) {
      console.error("Error fetching tips:", error);
    }
  }, [tips, error]);

  return (
    <div>
      <h1>User ID: {id}</h1>
      {isLoading ? (
        <TipPostSkeleton />
      ) : (
        <div className="flex flex-col justify-center gap-5">
          {tips?.map((tip) => (
            <TipPostCard key={tip.id} {...tip} />
          ))}
        </div>
      )}
    </div>
  );
}
