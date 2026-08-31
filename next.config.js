/** @type {import('next').NextConfig} */
module.exports = {
  compress: false,
  webpack: (config) => {
    config.optimization.minimize = false;
    return config;
  },
  async rewrites() {
    return [
      { source: "/", destination: "/index.html" },
      { source: "/cebu", destination: "/cebu.html" }
    ];
  },
};
