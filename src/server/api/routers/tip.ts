import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const tipRouter = createTRPCRouter({
  getTips: publicProcedure
    .input(
      z.object({
        limit: z.number().default(10),
        cursor: z.string().uuid().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const tips = await ctx.db.tip.findMany({
        cursor: input.cursor ? { id: input.cursor } : undefined,
        take: input.limit + 1,
        orderBy: { createdAt: "desc" },
        select: {
          user: {
            select: {
              id: true,
              avatar: true,
              username: true,
            },
          },
          id: true,
          createdAt: true,
          title: true,
          content: true,
        },
      });

      let nextCursor: typeof input.cursor | undefined;

      if (tips.length > input.limit) {
        const nextItem = tips.pop();
        if (nextItem?.id) nextCursor = nextItem.id;
      }

      return { tips, nextCursor };
    }),
});
