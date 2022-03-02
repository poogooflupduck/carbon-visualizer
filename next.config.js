/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
};

const withYAML = require("next-yaml");
module.exports = withYAML(nextConfig);
