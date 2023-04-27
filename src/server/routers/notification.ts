import { observable } from "@trpc/server/observable";
import { EventEmitter } from "events";
import { prisma } from "../prisma";
import { z } from "zod";
import { authProcedure, publicProcedure, router } from "../trpc";
import { Notification } from "@prisma/client";

interface MyEvents {
  push: (data: Notification) => void;
}
declare interface MyEventEmitter {
  on<TEv extends keyof MyEvents>(event: TEv, listener: MyEvents[TEv]): this;
  off<TEv extends keyof MyEvents>(event: TEv, listener: MyEvents[TEv]): this;
  once<TEv extends keyof MyEvents>(event: TEv, listener: MyEvents[TEv]): this;
  emit<TEv extends keyof MyEvents>(
    event: TEv,
    ...args: Parameters<MyEvents[TEv]>
  ): boolean;
}

class MyEventEmitter extends EventEmitter {}

const ee = new MyEventEmitter();

export const notificationRouter = router({
  push: authProcedure
    .input(
      z.object({
        content: z.string(),
        link: z.string().optional(),
        userId: z.number(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { id } = ctx.user;
      const noti = await prisma.notification.create({
        data: { ...input, actorId: id },
      });
      ee.emit("push", noti);
      return noti;
    }),
  seenAll: authProcedure.input(z.object({})).mutation(async ({ ctx }) => {
    await prisma.notification.updateMany({
      where: { userId: ctx.user.id },
      data: { seen: true },
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
      const cursor = input.cursor;

      const items = await prisma.notification.findMany({
        where: {
          userId: ctx.user.id,
        },
        orderBy: {
          createdAt: "desc",
        },
        cursor: cursor ? { id: cursor } : undefined,
        take: take + 1,
        skip: 0,
        include: {
          actor: true,
        },
      });

      let nextCursor: typeof cursor | undefined = undefined;
      if (items.length > take) {
        const nextItem = items.pop();
        nextCursor = nextItem!.id;
      }
      return {
        items,
        nextCursor,
      };
    }),
  onPush: publicProcedure.subscription(() => {
    return observable<Notification>((emit) => {
      const onPush = (data: Notification) => emit.next(data);
      ee.on("push", onPush);
      return () => {
        ee.off("push", onPush);
      };
    });
  }),
});
