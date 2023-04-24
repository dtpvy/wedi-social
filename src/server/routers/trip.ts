import { z } from "zod";
import { authedProcedure, router } from "../trpc";
import { prisma } from "../prisma";
import { Privacy, TripStatus } from "@prisma/client";

export const tripRouter = router({
  create: authedProcedure
    .input(
      z.object({
        name: z.string(),
        imgUrl: z.string(),
        status: z.nativeEnum(TripStatus),
        startDate: z.date(),
        privacy: z.nativeEnum(Privacy),
      })
    )
    .query(async ({ input, ctx }) => {
      const { id } = ctx.user;
      const data = await prisma.trip.create({
        data: {
          ...input,
          creatorId: id,
        },
      });
      await prisma.joinTrip.create({
        data: { tripId: data.id, userId: id, status: "JOINED" },
      });
      return true;
    }),
  update: authedProcedure
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
  delete: authedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      await prisma.trip.delete({ where: { id: input.id } });
      return true;
    }),
  invite: authedProcedure
    .input(z.object({ id: z.number(), userId: z.number() }))
    .mutation(async ({ input, ctx }) => {
      await prisma.joinTrip.create({
        data: {
          tripId: input.id,
          userId: input.userId,
          inviterId: ctx.user.id,
          status: "PENDING",
        },
      });
      return true;
    }),
  request: authedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input, ctx }) => {
      await prisma.joinTrip.create({
        data: {
          tripId: input.id,
          userId: ctx.user.id,
          status: "PENDING",
        },
      });
      return true;
    }),
  accept: authedProcedure
    .input(z.object({ id: z.number(), userId: z.number().optional() }))
    .mutation(async ({ input, ctx }) => {
      await prisma.joinTrip.update({
        where: {
          userId_tripId: {
            userId: input.userId || ctx.user.id,
            tripId: input.id,
          },
        },
        data: { status: "JOINED" },
      });
      return true;
    }),
  reject: authedProcedure
    .input(z.object({ id: z.number(), userId: z.number().optional() }))
    .mutation(async ({ input, ctx }) => {
      await prisma.joinTrip.update({
        where: {
          userId_tripId: {
            userId: input.userId || ctx.user.id,
            tripId: input.id,
          },
        },
        data: { status: "REJECTED" },
      });
      return true;
    }),
  leave: authedProcedure
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
