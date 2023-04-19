import axios from "axios";

type Params = {
  city: string;
  district: string;
  ward: string;
  street: string;
};

const MAP_URL = "https://rsapi.goong.io/Place/AutoComplete";

const placeAPI = ({ city, district, ward, street }: Params) => {
  const input = [street, ward, district, city].join(", ");
  return axios
    .get(MAP_URL, {
      params: { api_key: process.env.API_MAP_KEY, input },
    })
    .then((res) => res.data);
};

export default placeAPI;
