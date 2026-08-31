/** @type {import('next').NextConfig} */
module.exports = {
  compress: false,
  webpack: (config) => {
    config.optimization.minimize = false;
    return config;
  },
  outputFileTracingIncludes: {
    "/*": [
      "./styles.css",
      "./app.js",
      "./cal.js",
      "./guests.js",
      "./public/styles.css",
      "./public/app.js",
      "./public/cal.js",
      "./public/guests.js",
    ],
  },
  async rewrites() {
    return [
      { source: "/", destination: "/index.html" },
      { source: "/hotel", destination: "/hotel.html" },
      { source: "/results", destination: "/results.html" },
      { source: "/cebu.html", destination: "/results.html" },
      { source: "/:city", destination: "/results.html" },
    ];
  },
};
