import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { tipRouter } from "./routers/tip";
import { commentsRouter } from "./routers/comments";
import { rateRouter } from "./routers/rate";
import { categoryRouter } from "./routers/category";
import { authorRouter } from "./routers/author";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  tip: tipRouter,
  comment: commentsRouter,
  rate: rateRouter,
  categoy: categoryRouter,
  user: authorRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
