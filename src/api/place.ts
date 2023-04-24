import { Place } from "@/types/place";
import { API_MAP_KEY } from "@/utils/env";
import axios from "axios";

type Params = {
  country: string;
  city: string;
  district: string;
  ward: string;
  street: string;
};

const MAP_URL = "https://rsapi.goong.io/place/autocomplete";

export const getPlaceList = ({
  country,
  city,
  district,
  ward,
  street,
}: Params) => {
  const input = [street, ward, district, city, country]
    .filter((value) => !!value)
    .join(", ");
  console.log({ API_MAP_KEY });
  return axios
    .get(MAP_URL, {
      params: { api_key: API_MAP_KEY, input },
    })
    .then((res) => res.data as Place);
};
