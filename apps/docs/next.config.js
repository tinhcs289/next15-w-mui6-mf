import createNextIntlPlugin from "next-intl/plugin";

const { NEXT_PUBLIC_ZONE_NAME: ZONE_NAME } = process.env;

const withNextInlt = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  assetPrefix: `/${ZONE_NAME}-static`,
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/_static/_next/:path*",
          destination: "/_next/:path*",
        },
      ],
    };
  },
};

export default withNextInlt(nextConfig);
