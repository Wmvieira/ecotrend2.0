import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { currentUser } from "@clerk/nextjs/server";
import { TRPCClientError } from "@trpc/client";

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
});
