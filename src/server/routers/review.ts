import { z } from "zod";
import { prisma } from "../prisma";
import { authedProcedure, router } from "../trpc";

export const reviewRouter = router({
  add: authedProcedure
    .input(
      z.object({
        postId: z.number(),
        locationId: z.number(),
        rating: z.number(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      await prisma.review.create({
        data: { ...input, userId: ctx.user.id },
      });
      return true;
    }),
  update: authedProcedure
    .input(
      z.object({
        id: z.number(),
        postId: z.number(),
        rating: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      await prisma.review.update({
        where: { id: input.id },
        data: input,
      });
      return true;
    }),
  find: authedProcedure
    .input(z.object({ locationIds: z.number().array() }))
    .query(async ({ input, ctx }) => {
      const data = await prisma.review.findMany({
        where: { userId: ctx.user.id, locationId: { in: input.locationIds } },
      });
      return data;
    }),
});
