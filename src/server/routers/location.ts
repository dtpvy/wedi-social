import { z } from 'zod';
import { prisma } from '../prisma';
import { authProcedure, publicProcedure, router } from '../trpc';

export const locationRouter = router({
  languages: publicProcedure.input(z.object({})).query(async ({}) => {
    const query = await prisma.language.findMany({});
    return query;
  }),
  countries: publicProcedure.input(z.object({})).query(async ({}) => {
    const query = await prisma.country.findMany({});
    return query;
  }),
  cities: publicProcedure.input(z.object({ countryId: z.number() })).query(async ({ input }) => {
    const query = await prisma.city.findMany({
      where: { countryId: input.countryId },
    });
    return query;
  }),
  districts: publicProcedure.input(z.object({ cityId: z.number() })).query(async ({ input }) => {
    const query = await prisma.district.findMany({
      where: { cityId: input.cityId },
    });
    return query;
  }),
  wards: publicProcedure.input(z.object({ districtId: z.number() })).query(async ({ input }) => {
    const query = await prisma.ward.findMany({
      where: { districtId: input.districtId },
    });
    return query;
  }),
  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        address: z.string(),
        latitude: z.number(),
        longitude: z.number(),
        category: z.string(),
        imgUrl: z.string(),
        placeId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { address, latitude, longitude, category, placeId, name, imgUrl } = input;
      const exist = await prisma.location.findFirst({
        where: { placeId },
      });
      if (exist) return exist;

      const query = await prisma.location.create({
        data: {
          address,
          latitude,
          longitude,
          category,
          placeId,
          name,
          imgUrl,
        },
      });
      return query;
    }),
  feed: authProcedure
    .input(
      z.object({
        cursor: z.number().nullish(),
        take: z.number().min(1).max(10).nullish(),
      })
    )
    .query(async ({ input }) => {
      const take = input.take ?? 10;
      const cursor = input.cursor;

      const items = await prisma.location.findMany({
        orderBy: {
          createdAt: 'desc',
        },
        where: { status: 'ACTIVE' },
        include: {
          reviews: {
            include: {
              post: true,
              user: true,
            },
            take: 5,
          },
        },
        cursor: cursor ? { id: cursor } : undefined,
        take: take + 1,
        skip: 0,
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
});
