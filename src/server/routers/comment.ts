import { z } from "zod";
import { authProcedure, publicProcedure, router } from "../trpc";
import { prisma } from "../prisma";
import EventEmitter from "events";
import { Comment } from "@prisma/client";
import { observable } from "@trpc/server/observable";

interface MyEvents {
  create: (data: Comment) => void;
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

export const commentRouter = router({
  onCreate: authProcedure.subscription(() => {
    return observable<Comment>((emit) => {
      const onCreate = (data: Comment) => emit.next(data);
      ee.on("create", onCreate);
      return () => {
        ee.off("create", onCreate);
      };
    });
  }),
  create: authProcedure
    .input(
      z.object({
        content: z.string().optional(),
        imgUrls: z.string().array(),
        postId: z.number(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { id } = ctx.user;
      const comment = await prisma.comment.create({
        data: {
          ...input,
          userId: id,
        },
      });
      ee.emit("create", comment);
      return true;
    }),
  infinite: authProcedure
    .input(
      z.object({
        postId: z.number(),
        cursor: z.number().nullish(),
        take: z.number().min(1).max(10).nullish(),
      })
    )
    .query(async ({ input, ctx }) => {
      const take = input.take ?? 10;
      const cursor = input.cursor;

      const reactions = await prisma.reaction.findMany({
        orderBy: { id: "asc" },
      });

      const items = await prisma.comment.findMany({
        where: {
          userId: ctx.user.id,
          postId: input.postId,
        },
        orderBy: {
          createdAt: "desc",
        },
        cursor: cursor ? { id: cursor } : undefined,
        take: take + 1,
        skip: 0,
        include: {
          user: true,
          reactions: {
            include: {
              reaction: true,
            },
          },
          _count: {
            select: { reactions: true },
          },
        },
      });

      const countReaction = await Promise.all(
        items.map(async (d) => {
          const reaction = await Promise.all(
            reactions.map(async (react) => {
              const data = await prisma.commentReaction.count({
                where: { reactionId: react.id, commentId: d.id },
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
  update: authProcedure
    .input(
      z.object({
        id: z.number(),
        content: z.string().optional(),
        imgUrls: z.string().array(),
      })
    )
    .mutation(async ({ input }) => {
      const { id, ...comment } = input;
      await prisma.comment.update({
        where: { id },
        data: comment,
      });
      return true;
    }),
  delete: authProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const { id } = input;
      await prisma.commentReaction.deleteMany({ where: { commentId: id } });
      await prisma.comment.delete({ where: { id } });
      return true;
    }),
});
