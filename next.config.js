/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "docipo.ipotrending.com" },
      { protocol: "https", hostname: "ipo-premium.com" },
      { protocol: "https", hostname: "**" },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/guides/what-is-ipo-gmp",
        destination: "/articles/what-is-ipo-gmp-grey-market-premium",
        permanent: true,
      },
      {
        source: "/guides/what-is-ipo-gmp/",
        destination: "/articles/what-is-ipo-gmp-grey-market-premium",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
