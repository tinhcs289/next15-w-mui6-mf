import createNextIntlPlugin from "next-intl/plugin";

/**
 * Rewrites for Multi-Zones
 * @param {string} zone
 * @param {string} zoneUrl
 * @returns {Array<import("next/dist/lib/load-custom-routes").Rewrite>}
 */
function createRewritesForZone(zone, zoneUrl) {
  // define all the i18n prefix paths here
  // TODO: if you change the app locales, you should update this line
  const locales = ["", "vi", "en", "cn"];

  return [
    ...locales.map((locale) => ({
      source: !locale ? `/${zone}` : `/${locale}/${zone}`,
      destination: !locale ? `${zoneUrl}` : `${zoneUrl}/${locale}`,
    })),
    ...locales.map((locale) => ({
      source: !locale ? `/${zone}/:path*` : `/${locale}/${zone}/:path*`,
      destination: !locale
        ? `${zoneUrl}/:path*`
        : `${zoneUrl}/${locale}/:path*`,
    })),
    {
      source: `/${zone}-static/:path*`,
      destination: `${zoneUrl}/_static/:path*`,
    },
  ];
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  eslint: {
      ignoreDuringBuilds: true
  },
  async rewrites() {
    return [
      ...createRewritesForZone("docs", process.env.NEXT_PUBLIC_DOCS_URL),
      // TODO: rewrites for another zones go here
    ];
  },
};

const withNextInlt = createNextIntlPlugin();

export default withNextInlt(nextConfig);