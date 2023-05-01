import { z } from 'zod';
import { prisma } from '../prisma';
import { authProcedure, router } from '../trpc';

export const reviewRouter = router({
  add: authProcedure
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
  update: authProcedure
    .input(
      z.object({
        postId: z.number(),
        locationId: z.number(),
        rating: z.number(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { postId, locationId, rating } = input;
      await prisma.review.update({
        where: {
          userId_postId_locationId: { userId: ctx.user.id, postId, locationId },
        },
        data: { rating },
      });
      return true;
    }),
  delete: authProcedure
    .input(
      z.object({
        postId: z.number(),
        locationId: z.number(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { postId, locationId } = input;
      await prisma.review.delete({
        where: {
          userId_postId_locationId: { userId: ctx.user.id, postId, locationId },
        },
      });
      return true;
    }),
  find: authProcedure
    .input(z.object({ locationIds: z.number().array() }))
    .query(async ({ input, ctx }) => {
      const data = await prisma.review.findMany({
        where: { userId: ctx.user.id, locationId: { in: input.locationIds } },
        orderBy: {
          createdAt: 'desc',
        },
      });
      return data;
    }),
});
