import { z } from "zod";
import { authedProcedure, router } from "../trpc";
import { prisma } from "../prisma";

export const reactionRouter = router({
  create: authedProcedure
    .input(
      z.object({
        reactionId: z.number(),
        postId: z.number(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { id } = ctx.user;
      await prisma.postReaction.create({
        data: {
          ...input,
          userId: id,
        },
      });
      return true;
    }),
  update: authedProcedure
    .input(
      z.object({
        reactionId: z.number(),
        postId: z.number(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { reactionId, postId } = input;
      const reaction = await prisma.postReaction.findFirst({
        where: { userId: ctx.user.id, postId },
      });

      if (reaction?.reactionId === reactionId) {
        await prisma.postReaction.delete({
          where: { postId_userId: { postId, userId: ctx.user.id } },
        });
      } else {
        await prisma.postReaction.update({
          where: { postId_userId: { postId, userId: ctx.user.id } },
          data: { reactionId },
        });
      }
      return true;
    }),
});
