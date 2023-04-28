import { z } from 'zod';
import { prisma } from '../prisma';
import { publicProcedure, router } from '../trpc';

export const trackingRouter = router({
  add: publicProcedure
    .input(
      z.object({
        event: z.string(),
        page: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { event, page } = input;
      const data = await prisma.tracking.findFirst({ where: { event, page } });
      if (data) {
        await prisma.tracking.update({
          where: { id: data.id },
          data: { amount: data.amount + 1 },
        });
      } else {
        await prisma.tracking.create({
          data: { event, page, amount: 1 },
        });
      }

      return true;
    }),
});
