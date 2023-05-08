import ERROR_MESSAGES from '../../constants/error';
import { JoinTripStatus, Privacy, TripStatus } from '@prisma/client';
import { z } from 'zod';
import { prisma } from '../prisma';
import { authProcedure, router } from '../trpc';

export const tripRouter = router({
  feed: authProcedure.input(z.object({})).query(async ({ ctx }) => {
    const items = await prisma.trip.findMany({
      where: { privacy: Privacy.PUBLIC },
      include: {
        users: {
          where: { userId: ctx.user.id },
        },
        posts: {
          orderBy: {
            createdAt: 'desc',
          },
          take: 1,
        },
      },
      take: 10,
      skip: 0,
    });
    return items;
  }),
  userTrip: authProcedure.input(z.object({})).query(async ({ ctx }) => {
    const items = await prisma.joinTrip.findMany({
      where: { userId: ctx.user.id },
      include: {
        trip: {
          include: {
            users: {
              where: { userId: ctx.user.id },
            },
            posts: {
              orderBy: {
                createdAt: 'desc',
              },
              take: 1,
            },
          },
        },
      },
    });
    return items;
  }),
  post: authProcedure
    .input(
      z.object({
        tripId: z.number(),
        cursor: z.number().nullish(),
        take: z.number().min(1).max(10).nullish(),
      })
    )
    .query(async ({ input }) => {
      const take = input.take ?? 10;
      const cursor = input.cursor;

      const reactions = await prisma.reaction.findMany({
        orderBy: { id: 'asc' },
      });

      const items = await prisma.post.findMany({
        orderBy: {
          createdAt: 'desc',
        },
        where: { tripId: input.tripId },
        include: {
          creator: true,
          reviews: true,
          locations: {
            include: {
              location: true,
            },
          },
          reactions: {
            include: {
              reaction: true,
            },
          },
          _count: {
            select: { comments: true, reactions: true },
          },
        },
        cursor: cursor ? { id: cursor } : undefined,
        take: take + 1,
        skip: 0,
      });

      const countReaction = await Promise.all(
        items.map(async (d) => {
          const reaction = await Promise.all(
            reactions.map(async (react) => {
              const data = await prisma.postReaction.count({
                where: { reactionId: react.id, postId: d.id },
              });
              return { ...react, count: data };
            })
          );
          return { ...d, reaction };
        })
      );

      let nextCursor: typeof cursor | undefined = undefined;
      if (items.length > take) {
        const nextItem = items.pop();
        nextCursor = nextItem!.id;
      }
      return {
        items: countReaction,
        nextCursor,
      };
    }),
  memberList: authProcedure.input(z.object({ id: z.number() })).query(async ({ input, ctx }) => {
    const data = await prisma.joinTrip.findMany({
      where: { tripId: input.id, status: JoinTripStatus.JOINED },
      include: {
        user: true,
      },
    });
    return data;
  }),
  requestList: authProcedure.input(z.object({ id: z.number() })).query(async ({ input, ctx }) => {
    const data = await prisma.joinTrip.findMany({
      where: { tripId: input.id, status: JoinTripStatus.PENDING },
      include: {
        user: true,
      },
    });
    return data;
  }),
  get: authProcedure.input(z.object({ id: z.number() })).query(async ({ input, ctx }) => {
    const join = await prisma.joinTrip.findFirst({
      where: { tripId: input.id, userId: ctx.user.id },
    });
    const data = await prisma.trip.findFirst({
      where: { id: input.id },
      include: {
        users: {
          include: {
            user: true,
          },
        },
        _count: {
          select: {
            posts: true,
            schedules: true,
          },
        },
      },
    });
    if (data?.privacy === 'PRIVATE' && !join) throw new Error(ERROR_MESSAGES.dontHavePermission);
    if (data?.status === TripStatus.SCHEDULE && +data.createdAt <= +new Date()) {
      await prisma.trip.update({
        where: { id: input.id },
        data: { status: TripStatus.INPROGRESS },
      });
      data.status = TripStatus.INPROGRESS;
    }
    return { trip: data, join: !!join && join.status === JoinTripStatus.JOINED };
  }),
  create: authProcedure
    .input(
      z.object({
        name: z.string(),
        imgUrl: z.string(),
        bgUrl: z.string().optional(),
        startDate: z.date(),
        endDate: z.date().optional(),
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
      return data;
    }),
  update: authProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string(),
        imgUrl: z.string(),
        bgUrl: z.string().optional(),
        startDate: z.date(),
        endDate: z.date().optional(),
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
  done: authProcedure.input(z.object({ id: z.number() })).mutation(async ({ input, ctx }) => {
    await prisma.trip.update({
      where: { id: input.id },
      data: { status: TripStatus.DONE },
    });
    return true;
  }),
});
