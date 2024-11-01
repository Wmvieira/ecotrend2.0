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
  searchTerm: string | undefined,
  postOrder: boolean | undefined,
  startDate: Date | undefined,
  endDate: Date | undefined,
  userId: string | undefined,
) => {
  return await db.tip.findMany({
    cursor: cursor ? { id: cursor } : undefined,
    take: limit + 1,
    orderBy: [
      postOrder ? { rates: { _count: "desc" } } : {},
      { createdAt: "desc" },
      { title: "asc" },
    ],
    where: {
      ...(userId ? { authorId: userId } : undefined),
      ...(startDate && endDate
        ? {
            createdAt: {
              gte: startDate,
              lte: endDate,
            },
          }
        : undefined),
      ...(searchTerm
        ? {
            OR: [
              { title: { contains: searchTerm, mode: "insensitive" } },
              { content: { contains: searchTerm, mode: "insensitive" } },
              {
                category: {
                  some: { name: { contains: searchTerm, mode: "insensitive" } },
                },
              },
            ],
          }
        : undefined),
    },
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
      category: {
        select: {
          name: true,
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
        searchTerm: z.string().optional(),
        postOrder: z.boolean().optional(),
        startDate: z.date().optional(),
        endDate: z.date().optional(),
        userId: z.string().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const tips = await getTipsWithRatingsAndCountComments(
        ctx.db,
        input.limit,
        input.cursor,
        input.searchTerm,
        input.postOrder,
        input.startDate,
        input.endDate,
        input.userId,
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
        title: z.string().max(120),
        content: z.string().max(3500),
        categories: z.array(z.string()).optional(),
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
          createdAt: new Date(),
          category: {
            connectOrCreate: input.categories?.map((category) => ({
              where: { name: category },
              create: { name: category },
            })),
          },
        },
      });
    }),
});
