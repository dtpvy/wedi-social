import { trpc } from '@/utils/trpc';
import { useMemo } from 'react';

type Params = {
  countryId: number | null;
  cityId: number | null;
  districtId: number | null;
};

const useLocation = ({ countryId, cityId, districtId }: Params) => {
  console.log({ countryId, cityId, districtId });
  const { data: country, isLoading: loadingCountry } = trpc.location.countries.useQuery({});
  const { data: city, isLoading: loadingCity } = trpc.location.cities.useQuery(
    { countryId: countryId as number },
    { enabled: typeof countryId === 'number' }
  );
  const { data: district, isLoading: loadingDistrict } = trpc.location.districts.useQuery(
    { cityId: cityId as number },
    { enabled: typeof cityId === 'number' }
  );
  const { data: ward, isLoading: loadingWard } = trpc.location.wards.useQuery(
    { districtId: districtId as number },
    { enabled: typeof districtId === 'number' }
  );

  const countries = useMemo(() => {
    return (country || []).map((d) => ({ value: `${d.id}`, label: d.name }));
  }, [country]);

  const cities = useMemo(() => {
    return (city || []).map((d) => ({ value: `${d.id}`, label: d.name }));
  }, [city]);

  const districts = useMemo(() => {
    return (district || []).map((d) => ({ value: `${d.id}`, label: d.name }));
  }, [district]);

  const wards = useMemo(() => {
    return (ward || []).map((d) => ({ value: `${d.id}`, label: d.name }));
  }, [ward]);

  return {
    countries,
    districts,
    wards,
    cities,
    loadingCity,
    loadingCountry,
    loadingDistrict,
    loadingWard,
  };
};

export default useLocation;
