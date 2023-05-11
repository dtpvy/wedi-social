import dayjs from '@/utils/dayjs';
import { z } from 'zod';
import ERROR_MESSAGES from '../../constants/errorMessage';
import { prisma } from '../prisma';
import { authProcedure, router } from '../trpc';

export const friendRouter = router({
  add: authProcedure.input(z.object({ userId: z.number() })).mutation(async ({ input, ctx }) => {
    const { id } = ctx.user;
    const { userId } = input;
    const request = await prisma.friend.findFirst({
      where: { userId: id, friendId: userId },
    });

    if (request?.status === 'REJECT' && dayjs().diff(request.updatedAt, 'days') < 1) {
      return {
        status: 302,
        message: ERROR_MESSAGES.waitRejectedRequest,
        time: dayjs().diff(request.updatedAt, 'minute'),
      };
    }

    const data = await prisma.friend.create({
      data: { userId: id, friendId: userId, status: 'PENDING' },
    });

    return {
      status: 200,
      data,
    };
  }),
  reject: authProcedure
    .input(z.object({ userId: z.number(), friendId: z.number() }))
    .mutation(async ({ input }) => {
      const { userId, friendId } = input;
      await prisma.friend.update({
        where: { userId_friendId: { userId, friendId } },
        data: { status: 'REJECT' },
      });

      return true;
    }),
  accept: authProcedure
    .input(z.object({ userId: z.number(), friendId: z.number() }))
    .mutation(async ({ input }) => {
      const { userId, friendId } = input;
      await prisma.friend.update({
        where: { userId_friendId: { userId, friendId } },
        data: { status: 'ACCEPT' },
      });

      return true;
    }),
  delete: authProcedure.input(z.object({ userId: z.number() })).mutation(async ({ input, ctx }) => {
    const { id } = ctx.user;
    const { userId } = input;

    try {
      await Promise.all([
        prisma.friend.delete({
          where: { userId_friendId: { userId, friendId: id } },
        }),
        prisma.friend.delete({
          where: { userId_friendId: { friendId: userId, userId: id } },
        }),
      ]);
    } catch {}

    return true;
  }),
  requestList: authProcedure
    .input(
      z.object({
        owner: z.boolean(),
      })
    )
    .query(async ({ input, ctx }) => {
      const params = input.owner ? { friendId: ctx.user.id } : { userId: ctx.user.id };
      const request = prisma.friend.findMany({
        where: { status: 'PENDING', ...params },
        include: { user: true, friend: true },
      });
      return request;
    }),
  friendList: authProcedure
    .input(z.object({ search: z.string(), order: z.string() }))
    .query(async ({ input, ctx }) => {
      const id = ctx.user.id;
      const { search, order } = input;

      const listFriend = async (
        id: number,
        fieldA: 'userId' | 'friendId',
        fieldB: 'friend' | 'user'
      ) => {
        const select = {
          id: true,
          name: true,
          imgUrl: true,
          friends: {
            where: { status: 'ACCEPT', friendId: { not: id } },
            include: {
              friend: {
                include: {
                  friends: { where: { status: 'ACCEPT', friendId: id } },
                  userFriends: { where: { status: 'ACCEPT', userId: id } },
                },
              },
            },
          },
          userFriends: {
            where: { status: 'ACCEPT', userId: { not: id } },
            include: {
              user: {
                include: {
                  friends: { where: { status: 'ACCEPT', friendId: id } },
                  userFriends: { where: { status: 'ACCEPT', userId: id } },
                },
              },
            },
          },
        };

        return prisma.friend.findMany({
          where: {
            status: 'ACCEPT',
            [fieldA]: id,
            [fieldB]: {
              name: {
                contains: search,
              },
            },
          },
          orderBy: {
            createdAt: order as 'asc' | 'desc',
          },
          select: {
            user: {
              select:
                fieldB === 'user'
                  ? (select as any)
                  : {
                      id: true,
                      name: true,
                      imgUrl: true,
                      status: true,
                    },
            },
            friend: {
              select:
                fieldB === 'friend'
                  ? (select as any)
                  : {
                      id: true,
                      name: true,
                      imgUrl: true,
                      status: true,
                    },
            },
          },
        });
      };

      const calcFriend = (obj: any) => {
        const total1 = obj.friends.reduce((total: number, f: any) => {
          const _total = f.friend.friends.length + f.friend.userFriends.length;
          return total + _total;
        }, 0);
        const total2 = obj.userFriends.reduce((total: number, f: any) => {
          const _total = f.user.friends.length + f.user.userFriends.length;
          return total + _total;
        }, 0);
        console.log(obj.friends, obj.userFriends);
        return total1 + total2;
      };

      const [list1, list2] = await Promise.all([
        listFriend(id, 'userId', 'friend'),
        listFriend(id, 'friendId', 'user'),
      ]);

      const list = [...list1, ...list2].map((item) => {
        const { friend, user } =
          item.user.id === id
            ? { friend: item.friend, user: item.user }
            : { friend: item.user, user: item.friend };

        return {
          user,
          friend,
          mutualFriends: calcFriend(friend),
        };
      });

      return list;
    }),
});
