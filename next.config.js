module.exports = {
  serverRuntimeConfig: {
    // Will only be available on the server side
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    APP_URL: process.env.APP_URL,
    WS_URL: process.env.WS_URL,
    API_MAP_KEY: process.env.API_MAP_KEY,
    SERVICE_ID: process.env.SERVICE_ID,
    EMAIL_PUBLIC_KEY: process.env.EMAIL_PUBLIC_KEY,
  },
  async redirects() {
    return [
      {
        source: '/profile/:id',
        destination: '/profile/:id/posts',
        permanent: true,
      },
      {
        source: '/trip/:id',
        destination: '/trip/:id/posts',
        permanent: true,
      },
    ];
  },
};
