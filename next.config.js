/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingIncludes: {
    "/": ["./index.html", "./styles.css", "./app.js", "./cal.js", "./guests.js"],
    "/hotel": ["./hotel.html", "./styles.css", "./app.js", "./cal.js", "./guests.js"],
    "/results": ["./results.html", "./styles.css", "./app.js", "./cal.js", "./guests.js"],
    "/cebu": ["./results.html", "./styles.css", "./app.js", "./cal.js", "./guests.js"],
    "/styles.css": ["./styles.css", "./public/styles.css"],
    "/app.js": ["./app.js", "./public/app.js"],
    "/cal.js": ["./cal.js", "./public/cal.js"],
    "/guests.js": ["./guests.js", "./public/guests.js"],
    "/*": [
      "./index.html",
      "./hotel.html",
      "./results.html",
      "./cebu.html",
      "./styles.css",
      "./app.js",
      "./cal.js",
      "./guests.js",
      "./public/index.html",
      "./public/hotel.html",
      "./public/results.html",
      "./public/cebu.html",
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

module.exports = nextConfig;
