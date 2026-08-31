/** @type {import('next').NextConfig} */
module.exports = {
  compress: false,
  webpack: (config) => {
    config.optimization.minimize = false;
    return config;
  },
  outputFileTracingIncludes: {
    "/styles.css": ["./styles.css"],
    "/app.js": ["./app.js"],
    "/cal.js": ["./cal.js"],
    "/guests.js": ["./guests.js"],
  },
  async rewrites() {
    return [
      { source: "/", destination: "/index.html" },
      { source: "/cebu", destination: "/cebu.html" },
      { source: "/hotel", destination: "/hotel.html" },
    ];
  },
};
