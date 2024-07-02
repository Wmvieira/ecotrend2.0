"use client";

import React, { useEffect, useState } from "react";
import { useParams } from 'next/navigation';
import TipPostCard from '~/app/_components/tip/TipPost/TipPostCard';
import TipPostSkeleton from '~/app/_components/tip/TipPost/TipPostSkeleton';
import { api, type RouterOutputs } from '~/trpc/react';
import Spinner from '~/components/ui/spinner';
import UserAvatar from '~/components/ui/userAvatar';

type TipsProps = RouterOutputs["tip"]["getUserTips"];

export default function UserPage() {
  const params = useParams();
  const { id } = params as { id: string };

  const { data: tips, isLoading: tipsLoading, error: tipsError } = api.tip.getUserTips.useQuery(id);

  useEffect(() => {
    if (tipsError) {
      console.error("Error fetching tips:", tipsError);
    }
  }, [tipsError]);

  if (tipsLoading) {
    return <Spinner />;
  }

  const author = tips?.[0]?.author;

  return (
    <div>
      <h1 className="text-2xl font-bold">Perfil do Usuário</h1>
      {author && (
        <UserAvatar
          imageUrl={author.imageUrl}
          username={author.username}
        />
      )}
      <h2 className="text-xl font-semibold mt-8">Posts</h2>
      {tipsLoading ? (
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
