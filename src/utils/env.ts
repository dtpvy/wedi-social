import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

const { APP_URL, WS_URL, API_MAP_KEY, SERVICE_ID, EMAIL_PUBLIC_KEY } = publicRuntimeConfig;

export { APP_URL, WS_URL, API_MAP_KEY, SERVICE_ID, EMAIL_PUBLIC_KEY };
