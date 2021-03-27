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
};
