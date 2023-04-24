import { City, Country, District, Location, Ward } from "@prisma/client";

export type LocationDetail = Location & {
  city: City;
  country: Country;
  district: District;
  ward: Ward;
};
