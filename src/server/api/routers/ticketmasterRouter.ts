import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import searchTicketmaster from "~/utils/ticketmaster";

export const ticketmasterRouter = createTRPCRouter({
  search: publicProcedure
    .input(
      z.object({
        searchTerm: z.string().optional(),
        startDate: z.string().optional(),
        endDate: z.string().optional(),
        resultSize: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      const res = await searchTicketmaster(input);

      return {
        payload: input,
        data: res,
      };
    }),
});
