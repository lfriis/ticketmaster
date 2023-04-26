import { createTRPCRouter } from "~/server/api/trpc";
import { ticketmasterRouter } from "~/server/api/routers/ticketmasterRouter";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  ticketmaster: ticketmasterRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
