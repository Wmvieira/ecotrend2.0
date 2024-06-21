import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { addUsersToComments } from "~/lib/users";

export const commentsRouter = createTRPCRouter({
  getCommentsForTip: publicProcedure
    .input(
      z.object({
        tipId: z.string().uuid(),
        limit: z.number().default(10),
        cursor: z.string().uuid().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const comments = await ctx.db.comment.findMany({
        where: { tipId: input.tipId },
        cursor: input.cursor ? { id: input.cursor } : undefined,
        take: input.limit + 1,
        orderBy: [{ createdAt: "desc" }, { id: "asc" }],
      });

      let nextCursor: typeof input.cursor | undefined;
      if (comments.length > input.limit) {
        const nextItem = comments.pop();
        if (nextItem?.id) nextCursor = nextItem.id;
      }
      const commentsWithAuthor = await addUsersToComments(comments);

      return { comments: commentsWithAuthor, nextCursor };
    }),
});
