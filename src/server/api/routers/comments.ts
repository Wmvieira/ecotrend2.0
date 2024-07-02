import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { addUsersToComments } from "~/lib/users";
import { currentUser } from "@clerk/nextjs/server";
import { TRPCClientError } from "@trpc/client";

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

  createComment: publicProcedure
    .input(
      z.object({
        tipId: z.string().uuid(),
        content: z.string().min(1).max(1000),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const user = await currentUser();
      if (!user) {
        throw new TRPCClientError("User not found");
      }

      const comment = await ctx.db.comment.create({
        data: {
          content: input.content,
          tipId: input.tipId,
          authorId: user.id,
        },
      });

      return {
        ...comment,
        author: {
          id: user.id,
          username:
            user.username ?? `${user?.firstName} ${user?.lastName}` ?? "",
          imageUrl: user.imageUrl,
        },
      };
    }),
});
