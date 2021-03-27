module.exports = {
  async redirects() {
    return [
      {
        source: '/post/:id*',
        destination: '/posts/:id*',
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/posts',
        destination: '/posts/page/1',
      },
    ];
  },
};
