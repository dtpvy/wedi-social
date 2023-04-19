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
});
