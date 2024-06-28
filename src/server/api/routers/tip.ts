import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { currentUser } from "@clerk/nextjs/server";
import { addUsersToTipWithRatingAndCountComment } from "~/lib/users";
import { type Prisma, type PrismaClient } from "@prisma/client";
import { TRPCClientError } from "@trpc/client";

export type TipsWithRatingsAndCountComments = Prisma.PromiseReturnType<
  typeof getTipsWithRatingsAndCountComments
>;
const getTipsWithRatingsAndCountComments = async (
  db: PrismaClient,
  limit: number,
  cursor: string | undefined,
) => {
  return await db.tip.findMany({
    cursor: cursor ? { id: cursor } : undefined,
    take: limit + 1,
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
      }),
    )
    .query(async ({ ctx, input }) => {
      const tips = await getTipsWithRatingsAndCountComments(
        ctx.db,
        input.limit,
        input.cursor,
      );

      let nextCursor: typeof input.cursor | undefined;
      if (tips.length > input.limit) {
        const nextItem = tips.pop();
        if (nextItem?.id) nextCursor = nextItem.id;
      }

      const tipsWithAuthor = await addUsersToTipWithRatingAndCountComment(tips);

      return { tips: tipsWithAuthor, nextCursor };
    }),

  createPost: publicProcedure
    .input(
      z.object({
        title: z.string().max(20),
        content: z.string().max(300),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const user = await currentUser();
      if (!user) {
        throw new TRPCClientError("User not found");
      }

      return await ctx.db.tip.create({
        data: {
          title: input.title,
          content: input.content,
          authorId: user.id,
        },
      });
    }),
});
