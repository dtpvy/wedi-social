import { PlaceResponse } from '@/types/place';
import { APP_URL } from '@/utils/env';
import axios from 'axios';

export const getPlaceList = (query: string) => {
  return axios
    .get(APP_URL + '/api/place', {
      params: { query, suggestions: true },
    })
    .then((res) => res.data as PlaceResponse);
};
