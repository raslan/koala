/** @type {import('next').NextConfig} */
const { withSerwist } = require('@serwist/turbopack');
const withMDX = require('@next/mdx')();

const nextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  turbopack: {},
};

module.exports = withSerwist(withMDX(nextConfig));
