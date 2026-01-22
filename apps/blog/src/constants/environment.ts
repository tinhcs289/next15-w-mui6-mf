export const ENV_CONFIG = {
  environmentName: process.env.NEXT_PUBLIC_ENV_NAME || "localhost",
  applicationDomain: process.env.NEXT_PUBLIC_APP_DOMAIN || "",
  googleAnalyticsID: process.env.NEXT_PUBLIC_GOOGLE_GAID || "",
  googleMapApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY || "",
  proxyApiBaseUrl: process.env.NEXT_PUBLIC_PROXY_API_BASE_URL || "",
  internalRestApiBaseUrl: process.env.NEXT_PUBLIC_INTERNAL_REST_API_BASE_URL || "",
  zoneName: process.env.NEXT_PUBLIC_ZONE_NAME || "",
  zoneUrl: process.env.NEXT_PUBLIC_ZONE_URL || "",
  mainApplicationUrl: process.env.NEXT_PUBLIC_APP_MAIN_URL || "",
};