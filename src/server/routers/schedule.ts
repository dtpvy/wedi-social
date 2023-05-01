import { z } from 'zod';
import { prisma } from '../prisma';
import { authProcedure, router } from '../trpc';

export const scheduleRouter = router({
  feed: authProcedure
    .input(z.object({ joined: z.enum(['all', 'joined', 'notjoin']) }))
    .query(async ({ input, ctx }) => {
      const { joined } = input;
      const trips = await prisma.joinTrip.findMany({ where: { userId: ctx.user.id } });

      const data = await prisma.schedule.findMany({
        where: {
          tripId: { in: trips.map((d) => d.tripId) },
          ...(joined !== 'all' && {
            joinSchedule:
              joined === 'joined'
                ? { every: { userId: ctx.user.id } }
                : { none: { userId: ctx.user.id } },
          }),
        },
        include: {
          trip: true,
          creator: true,
          location: true,
          joinSchedule: {
            include: {
              user: true,
            },
          },
        },
      });

      const dataRating = await Promise.all(
        data.map(async (d) => {
          const rating = await prisma.review.groupBy({
            by: ['locationId'],
            where: { locationId: d.locationId },
            _avg: {
              rating: true,
            },
          });
          return { ...d, rating: rating[0]._avg.rating };
        })
      );

      return dataRating;
    }),
  list: authProcedure.input(z.object({ tridId: z.number() })).query(async ({ input }) => {
    const data = await prisma.schedule.findMany({
      where: { tripId: input.tridId },
      include: {
        creator: true,
        location: true,
        joinSchedule: {
          include: {
            user: true,
          },
        },
      },
    });

    const dataRating = await Promise.all(
      data.map(async (d) => {
        const rating = await prisma.review.groupBy({
          by: ['locationId'],
          where: { locationId: d.locationId },
          _avg: {
            rating: true,
          },
        });
        return { ...d, rating: rating[0]._avg.rating };
      })
    );

    return dataRating;
  }),
  create: authProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string().optional(),
        locationId: z.number(),
        startTime: z.date(),
        tripId: z.number(),
        endTime: z.date().optional(),
        reminderTime: z.date().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { id } = ctx.user;
      const { reminderTime, ...schedule } = input;
      const data = await prisma.schedule.create({
        data: {
          ...schedule,
          creatorId: id,
        },
      });
      await prisma.joinSchedule.create({
        data: { scheduleId: data.id, userId: id, reminderTime },
      });
      return true;
    }),
  get: authProcedure.input(z.object({ id: z.number() })).mutation(async ({ input, ctx }) => {
    const { id } = ctx.user;
    const data = await prisma.schedule.findFirst({
      where: { id: input.id },
      include: {
        joinSchedule: {
          where: { userId: id },
        },
      },
    });

    return data;
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
    .input(z.object({ id: z.number(), reminderTime: z.date().optional() }))
    .mutation(async ({ input, ctx }) => {
      await prisma.joinSchedule.create({
        data: {
          scheduleId: input.id,
          reminderTime: input.reminderTime,
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
    .input(z.object({ id: z.number(), reminderTime: z.date() }))
    .mutation(async ({ input, ctx }) => {
      await prisma.joinSchedule.update({
        where: {
          userId_scheduleId: {
            scheduleId: input.id,
            userId: ctx.user.id,
          },
        },
        data: { reminderTime: input.reminderTime },
      });
      return true;
    }),
});
