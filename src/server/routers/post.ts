import { z } from "zod";
import { prisma } from "../prisma";
import { authedProcedure, router } from "../trpc";
import { Privacy } from "@prisma/client";

export const postRouter = router({
  create: authedProcedure
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
      const data = await prisma.post.create({
        data: {
          ...post,
          creatorId: id,
        },
        include: {
          locations: true,
        },
      });
      await prisma.postLocation.createMany({
        data: locationIds.map((id) => ({ postId: data.id, locationId: id })),
      });
      return true;
    }),
  update: authedProcedure
    .input(
      z.object({
        id: z.number(),
        content: z.string(),
        imgUrls: z.string().array(),
        locationIds: z.number().array(),
      })
    )
    .mutation(async ({ input }) => {
      const { id, locationIds, ...post } = input;
      await prisma.post.update({
        where: { id },
        data: { ...post, locations: { set: [] } },
      });
      await prisma.postLocation.createMany({
        data: locationIds.map((locationId) => ({ postId: id, locationId })),
      });
      return true;
    }),
  delete: authedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const { id } = input;
      await prisma.post.delete({ where: { id } });
      return true;
    }),
});
