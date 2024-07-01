import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { addUsersToTipWithRatingAndCountComment } from "~/lib/users";
import { type Prisma, type PrismaClient } from "@prisma/client";

export type TipsWithRatingsAndCountComments = Prisma.PromiseReturnType<
  typeof getTipsWithRatingsAndCountComments
>;

const getTipsWithRatingsAndCountComments = async (
  db: PrismaClient,
  limit: number,
  cursor: string | undefined,
  searchTerm: string | undefined, // Novo parâmetro de busca
) => {
  return await db.tip.findMany({
    cursor: cursor ? { id: cursor } : undefined,
    take: limit + 1,
    where: searchTerm ? {
      OR: [
        { title: { contains: searchTerm, mode: 'insensitive' } },
        { category: { some: { name: { contains: searchTerm, mode: 'insensitive' } } } }
      ]
    } : undefined,
    orderBy: [{ createdAt: "desc" }, { title: "asc" }],
    include: {
      _count: {
        select: { comments: true },
      },
      rates: {
        select: {
          positive: true,
          authorId: true,
          id: true,
        },
      },
    },
  });
};

export const tipRouter = createTRPCRouter({
  getTips: publicProcedure
    .input(
      z.object({
        limit: z.number().default(10),
        cursor: z.string().uuid().optional(),
        searchTerm: z.string().optional(), // Novo campo de entrada para busca
      }),
    )
    .query(async ({ ctx, input }) => {
      const tips = await getTipsWithRatingsAndCountComments(
        ctx.db,
        input.limit,
        input.cursor,
        input.searchTerm, // Passando o termo de busca
      );

      let nextCursor: typeof input.cursor | undefined;
      if (tips.length > input.limit) {
        const nextItem = tips.pop();
        if (nextItem?.id) nextCursor = nextItem.id;
      }

      const tipsWithAuthor = await addUsersToTipWithRatingAndCountComment(tips);

      return { tips: tipsWithAuthor, nextCursor };
    }),
});
