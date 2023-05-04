import { z } from 'zod';
import { authProcedure, publicProcedure, router } from '../trpc';
import { prisma } from '../prisma';

export const reactionRouter = router({
  list: publicProcedure.input(z.object({})).query(async () => {
    const data = await prisma.reaction.findMany({ orderBy: { id: 'asc' } });
    return data;
  }),
  react: authProcedure
    .input(
      z.object({
        reactionId: z.number(),
        postId: z.number().optional(),
        commentId: z.number().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { id: userId } = ctx.user;
      const { reactionId, postId, commentId } = input;

      if (postId) {
        const data = await prisma.postReaction.findFirst({
          where: { userId, postId },
        });

        if (data?.reactionId === reactionId) {
          await prisma.postReaction.delete({
            where: { postId_userId: { postId, userId } },
          });
          return false;
        }

        if (data) {
          await prisma.postReaction.update({
            where: { postId_userId: { postId, userId } },
            data: { reactionId },
          });
          return true;
        }

        await prisma.postReaction.create({
          data: {
            postId,
            reactionId,
            userId,
          },
        });

        return true;
      }

      if (commentId) {
        const data = await prisma.commentReaction.findFirst({
          where: { userId, commentId },
        });

        if (data?.reactionId === reactionId) {
          await prisma.commentReaction.delete({
            where: { commentId_userId: { commentId, userId } },
          });
          return false;
        }

        if (data) {
          await prisma.commentReaction.update({
            where: { commentId_userId: { commentId, userId } },
            data: { reactionId },
          });
          return true;
        }

        await prisma.commentReaction.create({
          data: {
            commentId,
            reactionId,
            userId,
          },
        });

        return true;
      }
    }),
});
