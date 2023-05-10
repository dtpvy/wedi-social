import { APP_URL } from '@/utils/env';
import axios from 'axios';

const translateUrl = `${APP_URL}/api/language`;

export const fetchLocale = (language: string) => {
  return axios.get(translateUrl, { params: { language } }).then((res) => res.data);
};
