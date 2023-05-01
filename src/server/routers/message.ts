import { Message } from '@prisma/client';
import { authProcedure, router } from '../trpc';
import EventEmitter from 'events';
import { observable } from '@trpc/server/observable';
import { z } from 'zod';
import { prisma } from '../prisma';

interface MyEvents {
  send: (data: Message) => void;
}
declare interface MyEventEmitter {
  on<TEv extends keyof MyEvents>(event: TEv, listener: MyEvents[TEv]): this;
  off<TEv extends keyof MyEvents>(event: TEv, listener: MyEvents[TEv]): this;
  once<TEv extends keyof MyEvents>(event: TEv, listener: MyEvents[TEv]): this;
  emit<TEv extends keyof MyEvents>(event: TEv, ...args: Parameters<MyEvents[TEv]>): boolean;
}

class MyEventEmitter extends EventEmitter {}

const ee = new MyEventEmitter();

export const messageRouter = router({
  onSend: authProcedure.subscription(() => {
    return observable<Message>((emit) => {
      const onSend = (data: Message) => emit.next(data);
      ee.on('send', onSend);
      return () => {
        ee.off('send', onSend);
      };
    });
  }),
  send: authProcedure
    .input(
      z.object({
        content: z.string().optional(),
        userId: z.number(),
        mediaUrls: z.string().array().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { id } = ctx.user;
      const { content = '', userId, mediaUrls = [] } = input;
      const mess = await prisma.message.create({
        data: { content, mediaUrls, senderId: id, receiverId: userId },
      });
      ee.emit('send', mess);
      return mess;
    }),
  seenAll: authProcedure.input(z.object({})).mutation(async ({ ctx }) => {
    await prisma.message.updateMany({
      where: { OR: [{ receiverId: ctx.user.id }, { senderId: ctx.user.id }] },
      data: { updatedAt: new Date() },
    });
  }),
  infinite: authProcedure
    .input(
      z.object({
        cursor: z.number().nullish(),
        take: z.number().min(1).max(10).nullish(),
      })
    )
    .query(async ({ input, ctx }) => {
      const take = input.take ?? 10;
      const cursor = input.cursor || 0;

      const userId = ctx.user.id;

      const messages =
        (await prisma.$queryRaw`SELECT * FROM ( SELECT *, ROW_NUMBER() OVER (PARTITION BY CASE WHEN "senderId" = ${userId} THEN "receiverId" ELSE "senderId" END ORDER BY "createdAt" DESC) AS row_number FROM "Message" WHERE "senderId" = ${userId} OR "receiverId" = ${userId}) AS messages_with_row_numbers WHERE row_number = 1 ORDER BY "createdAt" DESC LIMIT ${take} OFFSET ${
          cursor * take
        }`) as Message[];

      const user = await prisma.user.findMany({
        select: { id: true, name: true, imgUrl: true },
      });

      return {
        items: messages.map((mess) => ({
          ...mess,
          sender: user.find((u) => u.id === mess.senderId),
          receiver: user.find((u) => u.id === mess.receiverId),
        })),
        nextCursor: cursor + 1,
      };
    }),
  conversation: authProcedure
    .input(
      z.object({
        cursor: z.number().nullish(),
        take: z.number().min(1).max(10).nullish(),
        userId: z.number(),
      })
    )
    .query(async ({ input, ctx }) => {
      const take = input.take ?? 10;
      const cursor = input.cursor;

      const items = await prisma.message.findMany({
        where: {
          OR: [
            {
              senderId: input.userId,
              receiverId: ctx.user.id,
            },
            {
              senderId: ctx.user.id,
              receiverId: input.userId,
            },
          ],
        },
        orderBy: {
          createdAt: 'desc',
        },
        cursor: cursor ? { id: cursor } : undefined,
        take: take + 1,
        skip: 0,
        include: {
          sender: true,
          receiver: true,
        },
      });

      let nextCursor: typeof cursor | undefined = undefined;
      if (items.length > take) {
        const nextItem = items.pop();
        nextCursor = nextItem!.id;
      }
      return {
        items: items.reverse(),
        nextCursor,
      };
    }),
});
