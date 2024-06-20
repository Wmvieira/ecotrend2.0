import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { addUsersToTipWithRatingAndCountComment } from "~/lib/users";
import { type Prisma, type PrismaClient } from "@prisma/client";

export type TipsWithRatingsAndCountComments = Prisma.PromiseReturnType<
  typeof getTipsWithRatingsAndCountComments
>;
const getTipsWithRatingsAndCountComments = (
  db: PrismaClient,
  limit: number,
  cursor: string | undefined,
) => {
  return db.tip.findMany({
    cursor: cursor ? { id: cursor } : undefined,
    take: limit + 1,
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: { comments: true },
      },
      ratings: {
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
      }),
    )
    .query(async ({ ctx, input }) => {
      const tips = await getTipsWithRatingsAndCountComments(
        ctx.db,
        input.limit,
        input.cursor,
      );

      let nextCursor: typeof input.cursor | undefined;

      const tipsWithAuthor = await addUsersToTipWithRatingAndCountComment(tips);

      if (tips.length > input.limit) {
        const nextItem = tips.pop();
        if (nextItem?.id) nextCursor = nextItem.id;
      }

      return { tips: tipsWithAuthor, nextCursor };
    }),
});
