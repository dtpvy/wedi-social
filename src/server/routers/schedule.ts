import { z } from 'zod';
import { authProcedure, router } from '../trpc';
import { prisma } from '../prisma';
import { Privacy, TripStatus } from '@prisma/client';

export const scheduleRouter = router({
  create: authProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string(),
        locationId: z.number(),
        startTime: z.date(),
        tripId: z.number(),
        endTime: z.date().optional(),
        remindTime: z.date().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { id } = ctx.user;
      const { remindTime, ...schedule } = input;
      const data = await prisma.schedule.create({
        data: {
          ...schedule,
          creatorId: id,
        },
      });
      await prisma.joinSchedule.create({
        data: { scheduleId: data.id, userId: id, remindTime },
      });
      return true;
    }),
  update: authProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string(),
        description: z.string(),
        locationId: z.number(),
        startTime: z.date(),
        endTime: z.date().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { id, ...schedule } = input;
      await prisma.schedule.update({
        where: { id },
        data: schedule,
      });
      return true;
    }),
  delete: authProcedure.input(z.object({ id: z.number() })).mutation(async ({ input }) => {
    await prisma.joinSchedule.deleteMany({ where: { scheduleId: input.id } });
    await prisma.schedule.delete({ where: { id: input.id } });
    return true;
  }),
  join: authProcedure
    .input(z.object({ id: z.number(), remindTime: z.date().optional() }))
    .mutation(async ({ input, ctx }) => {
      await prisma.joinSchedule.create({
        data: {
          scheduleId: input.id,
          remindTime: input.remindTime,
          userId: ctx.user.id,
        },
      });
      return true;
    }),
  cancel: authProcedure.input(z.object({ id: z.number() })).mutation(async ({ input, ctx }) => {
    await prisma.joinSchedule.delete({
      where: {
        userId_scheduleId: { scheduleId: input.id, userId: ctx.user.id },
      },
    });
    return true;
  }),
  updateTime: authProcedure
    .input(z.object({ id: z.number(), remindTime: z.date() }))
    .mutation(async ({ input, ctx }) => {
      await prisma.joinSchedule.update({
        where: {
          userId_scheduleId: {
            scheduleId: input.id,
            userId: ctx.user.id,
          },
        },
        data: { remindTime: input.remindTime },
      });
      return true;
    }),
});
