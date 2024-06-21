import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { currentUser } from "@clerk/nextjs/server";
import { TRPCClientError } from "@trpc/client";
import { addUsersToRates } from "~/lib/users";

export const rateRouter = createTRPCRouter({
  reateTip: publicProcedure
    .input(
      z.object({
        tipId: z.string().uuid(),
        positive: z.boolean().default(true),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const user = await currentUser();
      if (!user) {
        throw new TRPCClientError("User not found");
      }

      const rated = await ctx.db.rate.findUnique({
        where: {
          tipId_authorId: {
            tipId: input.tipId,
            authorId: user.id,
          },
        },
      });

      if (rated?.positive === input.positive) {
        await ctx.db.rate.delete({ where: { id: rated.id } });
      } else {
        return await ctx.db.rate.upsert({
          where: {
            id: rated?.id ?? "",
          },
          create: {
            tipId: input.tipId,
            positive: input.positive,
            authorId: user.id,
          },
          update: {
            positive: input.positive,
          },
        });
      }
    }),

  getAllForTip: publicProcedure
    .input(
      z.object({
        tipId: z.string().uuid(),
        limit: z.number().default(10),
        cursor: z.string().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const rates = await ctx.db.rate.findMany({
        where: {
          tipId: input.tipId,
        },
        cursor: input.cursor ? { id: input.cursor } : undefined,
        take: input.limit + 1,
        orderBy: [{ createdAt: "desc" }, { id: "asc" }],
      });

      let nextCursor: typeof input.cursor | undefined;
      if (rates.length > input.limit) {
        const nextItem = rates.pop();
        if (nextItem?.id) nextCursor = nextItem.id;
      }
      const ratesWithAuthor = await addUsersToRates(rates);

      return { rates: ratesWithAuthor, nextCursor };
    }),
});
