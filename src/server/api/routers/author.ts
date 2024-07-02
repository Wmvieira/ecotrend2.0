import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { getUser } from "~/lib/users";

export const authorRouter = createTRPCRouter({
  getAuthor: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ input }) => {
      return await getUser(input.id);
    }),
});
