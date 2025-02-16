import createNextIntlPlugin from "next-intl/plugin";

/**
 * Rewrites for Multi-Zones
 * @returns {Array<import("next/dist/lib/load-custom-routes").Rewrite>}
 */
function createRewritesForZones() {
  // define all the i18n prefix paths here
  // TODO: if you change the app locales, you should update this line
  const locales = ["", "vi", "en", "cn"];

  /**
   * @type {Array<import("next/dist/lib/load-custom-routes").Rewrite>}
   */
  const rewriteConfigs = Object.keys(process.env)
    .filter((k) => k.startsWith("NEXT_PUBLIC_ZONE_"))
    .reduce((configs, k) => {
      /**
       * @type {{ name: string, domain: string }}
       */
      const zone = JSON.parse(process.env[k].replaceAll("\\", ""));

      return [
        ...configs,
        ...locales.map((locale) => ({
          source: !locale ? `/${zone.name}` : `/${locale}/${zone.name}`,
          destination: !locale ? `${zone.domain}` : `${zone.domain}/${locale}`,
        })),
        ...locales.map((locale) => ({
          source: !locale
            ? `/${zone.name}/:path*`
            : `/${locale}/${zone.name}/:path*`,
          destination: !locale
            ? `${zone.domain}/:path*`
            : `${zone.domain}/${locale}/:path*`,
        })),
        {
          source: `/${zone.name}-static/:path*`,
          destination: `${zone.domain}/_static/:path*`,
        },
      ];
    }, []);

  return rewriteConfigs;
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  compiler: {
    styledComponents: true,
  },
  async rewrites() {
    return [...createRewritesForZones()];
  },
};

const withNextInlt = createNextIntlPlugin();

export default withNextInlt(nextConfig);
