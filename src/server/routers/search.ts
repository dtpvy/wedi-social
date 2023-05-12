import { z } from 'zod';
import { prisma } from '../prisma';
import { authProcedure, router } from '../trpc';

export const searchRouter = router({
  post: authProcedure
    .input(
      z.object({
        search: z.string(),
        sort: z.enum(['asc', 'desc']),
        field: z.string(),
        privacy: z.enum(['friend', 'public', 'all']),
        startDate: z.date().nullable(),
        endDate: z.date().nullable(),
      })
    )
    .query(async ({ input, ctx }) => {
      const userId = ctx.user.id;
      const { privacy, search, startDate, endDate, sort, field } = input;
      let where: any = { privacy: { not: 'PRIVATE' } };
      if (privacy === 'friend') {
        const friends = await prisma.friend.findMany({
          where: { OR: [{ userId: userId }, { friendId: userId }] },
        });

        where = {
          privacy: 'FRIEND',
          creatorId: { in: friends.map((f) => (f.userId === userId ? f.friendId : f.userId)) },
        };
      }
      if (privacy === 'public') {
        where = { privacy: 'PUBLIC' };
      }

      const reactions = await prisma.reaction.findMany({
        orderBy: { id: 'asc' },
      });

      const posts = await prisma.post.findMany({
        orderBy: {
          [field]: sort,
        },
        where: {
          content: { contains: search },
          ...(startDate && { createdAt: { lte: endDate || new Date(), gte: startDate } }),
          ...where,
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
      });

      const countReaction = await Promise.all(
        posts.map(async (d) => {
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

      return countReaction;
    }),
  trip: authProcedure
    .input(
      z.object({
        search: z.string(),
        sort: z.enum(['asc', 'desc']),
        field: z.string(),
        privacy: z.enum(['friend', 'public', 'all']),
        startDate: z.date().nullable(),
        endDate: z.date().nullable(),
      })
    )
    .query(async ({ input, ctx }) => {
      const userId = ctx.user.id;
      const { privacy, search, startDate, endDate, sort, field } = input;
      let where: any = { privacy: { not: 'PRIVATE' } };
      if (privacy === 'friend') {
        const friends = await prisma.friend.findMany({
          where: { OR: [{ userId: userId }, { friendId: userId }] },
        });

        where = {
          privacy: 'FRIEND',
          creatorId: { in: friends.map((f) => (f.userId === userId ? f.friendId : f.userId)) },
        };
      }
      if (privacy === 'public') {
        where = { privacy: 'PUBLIC' };
      }

      const trips = await prisma.trip.findMany({
        orderBy: {
          [field]: sort,
        },
        where: {
          name: { contains: search },
          ...(startDate && { createdAt: { lte: endDate || new Date(), gte: startDate } }),
          ...where,
        },
        include: {
          _count: {
            select: {
              posts: true,
              schedules: true,
            },
          },
          users: {
            where: { OR: [{ status: 'JOINED' }, { userId: ctx.user.id }] },
          },
          creator: true,
          posts: {
            orderBy: {
              createdAt: 'desc',
            },
            take: 1,
          },
          schedules: {
            orderBy: {
              createdAt: 'desc',
            },
            take: 1,
          },
        },
      });

      return trips;
    }),
  location: authProcedure
    .input(
      z.object({
        search: z.string(),
        sort: z.enum(['asc', 'desc']),
        field: z.string(),
      })
    )
    .query(async ({ input }) => {
      const { search, sort, field } = input;

      const locations = await prisma.location.findMany({
        orderBy: {
          [field]: sort,
        },
        where: {
          status: 'ACTIVE',
          name: { contains: search },
        },
        include: {
          reviews: {
            include: {
              post: true,
              user: true,
            },
          },
        },
      });

      return locations;
    }),
});
