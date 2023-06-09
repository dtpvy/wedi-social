import { date, z } from 'zod';
import { prisma } from '../prisma';
import { authProcedure, router } from '../trpc';
import { Privacy } from '@prisma/client';
import { getFriendList } from '../utils';

export const postRouter = router({
  get: authProcedure.input(z.object({ id: z.number() })).query(async ({ input, ctx }) => {
    const reactions = await prisma.reaction.findMany({
      orderBy: { id: 'asc' },
    });

    const post = await prisma.post.findFirst({
      where: { id: input.id },
      include: {
        trip: true,
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
          where: {
            userId: ctx.user.id,
          },
        },
        comments: {
          orderBy: {
            createdAt: 'desc',
          },
          take: 5,
        },
        _count: {
          select: { comments: true, reactions: true },
        },
      },
    });

    if (!post) return post;

    const reaction = await Promise.all(
      reactions.map(async (react) => {
        const data = await prisma.postReaction.count({
          where: { reactionId: react.id, postId: post.id },
        });
        return { ...react, count: data };
      })
    );

    return { ...post, reaction };
  }),
  feedTrip: authProcedure
    .input(
      z.object({
        cursor: z.number().nullish(),
        take: z.number().min(1).max(10).nullish(),
      })
    )
    .query(async ({ input, ctx }) => {
      const take = input.take ?? 10;
      const cursor = input.cursor;

      const reactions = await prisma.reaction.findMany({
        orderBy: { id: 'asc' },
      });

      const friendIds = await getFriendList(ctx.user.id);

      const items = await prisma.post.findMany({
        orderBy: {
          createdAt: 'desc',
        },
        where: {
          tripId: { not: null },
          OR: [
            { privacy: Privacy.PUBLIC },
            { privacy: Privacy.FRIEND, creatorId: { in: friendIds } },
          ],
        },
        include: {
          trip: true,
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
            where: {
              userId: ctx.user.id,
            },
          },
          comments: {
            orderBy: {
              createdAt: 'desc',
            },
            take: 5,
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
  feed: authProcedure
    .input(
      z.object({
        cursor: z.number().nullish(),
        take: z.number().min(1).max(10).nullish(),
      })
    )
    .query(async ({ input, ctx }) => {
      const take = input.take ?? 10;
      const cursor = input.cursor;

      const reactions = await prisma.reaction.findMany({
        orderBy: { id: 'asc' },
      });

      const friendIds = await getFriendList(ctx.user.id);

      const items = await prisma.post.findMany({
        orderBy: {
          createdAt: 'desc',
        },
        where: {
          tripId: null,
          OR: [
            { privacy: Privacy.PUBLIC },
            { privacy: Privacy.FRIEND, creatorId: { in: friendIds } },
          ],
        },
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
            where: {
              userId: ctx.user.id,
            },
          },
          comments: {
            orderBy: {
              createdAt: 'desc',
            },
            take: 5,
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
  userPost: authProcedure
    .input(
      z.object({
        cursor: z.number().nullish(),
        take: z.number().min(1).max(10).nullish(),
      })
    )
    .query(async ({ input, ctx }) => {
      const take = input.take ?? 10;
      const cursor = input.cursor;

      const reactions = await prisma.reaction.findMany({
        orderBy: { id: 'asc' },
      });

      const items = await prisma.post.findMany({
        orderBy: {
          createdAt: 'desc',
        },
        where: { creatorId: ctx.user.id, tripId: null },
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
  create: authProcedure
    .input(
      z.object({
        content: z.string(),
        imgUrls: z.string().array(),
        tripId: z.number().optional(),
        locationIds: z.number().array(),
        privacy: z.nativeEnum(Privacy),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { id } = ctx.user;
      const { locationIds, ...post } = input;

      let privacy = input.privacy;
      if (input.tripId !== undefined) {
        const trip = await prisma.trip.findFirst({ where: { id: input.tripId } });
        privacy = trip?.privacy || privacy;
      }

      const data = await prisma.post.create({
        data: {
          ...post,
          privacy,
          creatorId: id,
        },
        include: {
          locations: true,
        },
      });
      await prisma.postLocation.createMany({
        data: locationIds.map((id) => ({ postId: data.id, locationId: id })),
      });
      return data;
    }),
  update: authProcedure
    .input(
      z.object({
        id: z.number(),
        content: z.string(),
        imgUrls: z.string().array(),
      })
    )
    .mutation(async ({ input }) => {
      const { id, ...post } = input;

      await prisma.post.update({
        where: { id },
        data: { ...post },
      });
      return true;
    }),
  delete: authProcedure.input(z.object({ id: z.number() })).mutation(async ({ input }) => {
    const { id } = input;
    await prisma.post.delete({ where: { id } });
    return true;
  }),
});
