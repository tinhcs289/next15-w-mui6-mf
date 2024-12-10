import createNextIntlPlugin from "next-intl/plugin";

const withNextInlt = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  // basePath: "/docs",
  assetPrefix: "/docs-static",
  async rewrites() {
    return {
      beforeFiles: [
        // This rewrite is necessary to support assetPrefix only in Next 14 and below.
        // It is not necessary in Next 15.
        {
          source: "/_static/_next/:path*",
          destination: "/_next/:path*",
        },
      ],
    };
  },
};

export default withNextInlt(nextConfig);
