// For building on vercel: https://github.com/Automattic/node-canvas/issues/1779
if (
  process.env.LD_LIBRARY_PATH == null ||
  !process.env.LD_LIBRARY_PATH.includes(
    `${process.env.PWD}/node_modules/canvas/build/Release`,
  )
) {
  process.env.LD_LIBRARY_PATH = `${
    process.env.PWD
  }/node_modules/canvas/build/Release:${process.env.LD_LIBRARY_PATH || ''}`;
}
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
      {
        source: '/tags/:tagid',
        destination: '/tags/:tagid/page/1',
      },
    ];
  },
  outputFileTracing: true,
};
