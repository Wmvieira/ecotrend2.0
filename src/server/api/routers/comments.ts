import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const commentsRouter = createTRPCRouter({
  getCommentsForTip: publicProcedure
    .input(
      z.object({
        tipId: z.string().uuid(),
        limit: z.number().default(3),
        cursor: z.string().uuid().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const comments = await ctx.db.comment.findMany({
        where: { tipId: input.tipId },
        cursor: input.cursor ? { id: input.cursor } : undefined,
        take: input.limit + 1,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          content: true,
          user: {
            select: {
              id: true,
              avatar: true,
              username: true,
            },
          },
          createdAt: true,
        },
      });

      let nextCursor: typeof input.cursor | undefined;

      if (comments.length > input.limit) {
        const nextItem = comments.pop();
        if (nextItem?.id) nextCursor = nextItem.id;
      }

      return { comments, nextCursor };
    }),
});
