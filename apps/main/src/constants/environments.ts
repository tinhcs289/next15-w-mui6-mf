type ZoneConfig = { name: string; domain: string };
type ZoneDictionary = Record<"blog" | "admin", ZoneConfig>;
function getAllZones(): ZoneDictionary {
  const configs  = Object.keys(process.env)
    .filter((key) => key.startsWith("NEXT_PUBLIC_ZONE_") && key !== "NEXT_PUBLIC_ZONE_NAME")
    .reduce((dictionary, key) => {
      const value = process.env[key];
      if (!value) return dictionary;

      const zone: ZoneConfig = JSON.parse(value.replaceAll("\\", ""));
      dictionary[zone.name as keyof ZoneDictionary] = zone;
      return dictionary;
    }, {} as unknown as ZoneDictionary);
    return configs
}

export const ENV_CONFIG = {
  environmentName: process.env.NEXT_PUBLIC_ENV_NAME || "localhost",
  applicationDomain: process.env.NEXT_PUBLIC_APP_DOMAIN || "",
  googleAnalyticsID: process.env.NEXT_PUBLIC_GOOGLE_GAID || "",
  googleMapApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY || "",
  proxyApiBaseUrl: process.env.NEXT_PUBLIC_PROXY_API_BASE_URL || "",
  internalRestApiBaseUrl: process.env.NEXT_PUBLIC_INTERNAL_REST_API_BASE_URL || "",
  zoneName: process.env.NEXT_PUBLIC_ZONE_NAME || "",
  zones: getAllZones(),
};