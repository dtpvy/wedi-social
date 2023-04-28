import { z } from 'zod';
import { authProcedure, router } from '../trpc';
import { prisma } from '../prisma';
import { Privacy, TripStatus } from '@prisma/client';

export const tripRouter = router({
  get: authProcedure.input(z.object({ id: z.number() })).query(async ({ input, ctx }) => {
    const { id } = ctx.user;
    const join = await prisma.joinTrip.findFirst({
      where: { tripId: input.id, userId: ctx.user.id },
    });
    const data = await prisma.trip.findFirst({
      where: { id: input.id, users },
    });
    await prisma.joinTrip.create({
      data: { tripId: data.id, userId: id, status: 'JOINED' },
    });
    return true;
  }),
  create: authProcedure
    .input(
      z.object({
        name: z.string(),
        imgUrl: z.string(),
        status: z.nativeEnum(TripStatus),
        startDate: z.date(),
        privacy: z.nativeEnum(Privacy),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { id } = ctx.user;
      const data = await prisma.trip.create({
        data: {
          ...input,
          creatorId: id,
        },
      });
      await prisma.joinTrip.create({
        data: { tripId: data.id, userId: id, status: 'JOINED' },
      });
      return true;
    }),
  update: authProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string(),
        imgUrl: z.string(),
        status: z.nativeEnum(TripStatus),
        startDate: z.date(),
        privacy: z.nativeEnum(Privacy),
      })
    )
    .mutation(async ({ input }) => {
      const { id, ...trip } = input;
      await prisma.trip.update({
        where: { id },
        data: trip,
      });
      return true;
    }),
  delete: authProcedure.input(z.object({ id: z.number() })).mutation(async ({ input }) => {
    await prisma.trip.delete({ where: { id: input.id } });
    return true;
  }),
  invite: authProcedure
    .input(z.object({ id: z.number(), userId: z.number() }))
    .mutation(async ({ input, ctx }) => {
      await prisma.joinTrip.create({
        data: {
          tripId: input.id,
          userId: input.userId,
          inviterId: ctx.user.id,
          status: 'PENDING',
        },
      });
      return true;
    }),
  request: authProcedure.input(z.object({ id: z.number() })).mutation(async ({ input, ctx }) => {
    await prisma.joinTrip.create({
      data: {
        tripId: input.id,
        userId: ctx.user.id,
        status: 'PENDING',
      },
    });
    return true;
  }),
  accept: authProcedure
    .input(z.object({ id: z.number(), userId: z.number().optional() }))
    .mutation(async ({ input, ctx }) => {
      await prisma.joinTrip.update({
        where: {
          userId_tripId: {
            userId: input.userId || ctx.user.id,
            tripId: input.id,
          },
        },
        data: { status: 'JOINED' },
      });
      return true;
    }),
  reject: authProcedure
    .input(z.object({ id: z.number(), userId: z.number().optional() }))
    .mutation(async ({ input, ctx }) => {
      await prisma.joinTrip.update({
        where: {
          userId_tripId: {
            userId: input.userId || ctx.user.id,
            tripId: input.id,
          },
        },
        data: { status: 'REJECTED' },
      });
      return true;
    }),
  leave: authProcedure
    .input(z.object({ id: z.number(), userId: z.number().optional() }))
    .mutation(async ({ input, ctx }) => {
      await prisma.joinTrip.delete({
        where: {
          userId_tripId: {
            userId: input.userId || ctx.user.id,
            tripId: input.id,
          },
        },
      });
      return true;
    }),
});
