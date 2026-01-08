import createNextIntlPlugin from "next-intl/plugin";

const { NEXT_PUBLIC_ZONE_NAME: ZONE_NAME } = process.env;

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  assetPrefix: `/${ZONE_NAME}-static`,
  cacheComponents: true,
  compiler: {
    styledComponents: true,
  },
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },
  productionBrowserSourceMaps: true,
  reactStrictMode: false,
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
  webpack(config, { isServer }) {
    if (isServer) {
      config.devtool = "source-map";
    }
    return config;
  },
};

export default withNextIntl(nextConfig);
