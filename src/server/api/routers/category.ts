import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const categoryRouter = createTRPCRouter({
  getCategories: publicProcedure
    .input(
      z.object({
        term: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return await ctx.db.category.findMany({
        take: 10,
        where: {
          name: {
            contains: input.term,
            mode: "insensitive",
          },
        },
      });
    }),
});
