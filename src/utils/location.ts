import { LocationDetail } from "@/types/location";

export const getAddress = (location: LocationDetail) => {
  const { city, country, district, ward, street } = location;
  return [street, ward.name, district.name, city.name, country.name].join(", ");
};
