/** @type {import('next').NextConfig} */
const withMDX = require('@next/mdx')();
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
};

if (process.env.NODE_ENV === 'production') {
  const withSerwist = require('@serwist/next').default({
    // Note: This is only an example. If you use Pages Router,
    // use something else that works, such as "service-worker/index.ts".
    swSrc: 'app/sw.ts',
    swDest: 'public/sw.js',
  });

  // Apply serwist only if NODE_ENV is 'production'
  module.exports = withSerwist(withMDX(nextConfig));
} else {
  // If not in production, export the config without serwist
  module.exports = withMDX(nextConfig);
}
