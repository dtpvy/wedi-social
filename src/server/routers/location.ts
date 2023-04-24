import { z } from "zod";
import { prisma } from "../prisma";
import { publicProcedure, router } from "../trpc";

export const locationRouter = router({
  languages: publicProcedure.input(z.object({})).query(async ({}) => {
    const query = await prisma.language.findMany({});
    return query;
  }),
  countries: publicProcedure.input(z.object({})).query(async ({}) => {
    const query = await prisma.country.findMany({});
    return query;
  }),
  cities: publicProcedure
    .input(z.object({ countryId: z.number() }))
    .query(async ({ input }) => {
      const query = await prisma.city.findMany({
        where: { countryId: input.countryId },
      });
      return query;
    }),
  districts: publicProcedure
    .input(z.object({ cityId: z.number() }))
    .query(async ({ input }) => {
      const query = await prisma.district.findMany({
        where: { cityId: input.cityId },
      });
      return query;
    }),
  wards: publicProcedure
    .input(z.object({ districtId: z.number() }))
    .query(async ({ input }) => {
      const query = await prisma.ward.findMany({
        where: { districtId: input.districtId },
      });
      return query;
    }),
  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        countryId: z.number(),
        cityId: z.number(),
        districtId: z.number(),
        wardId: z.number(),
        street: z.string(),
        placeId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const exist = await prisma.location.findFirst({
        where: { placeId: input.placeId },
        include: {
          city: true,
          country: true,
          district: true,
          ward: true,
        },
      });
      if (exist) return exist;
      const query = await prisma.location.create({
        data: input,
        include: {
          city: true,
          country: true,
          district: true,
          ward: true,
        },
      });
      return query;
    }),
});
