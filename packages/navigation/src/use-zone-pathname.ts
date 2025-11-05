"use client";

import { useMemo } from "react";
import { usePathname as useIntlPathname } from "./intl-navigation";

export function useZonePathname(currentZone?: string) {
  const pathname = useIntlPathname();

  const zone = currentZone ?? "";

  const zonePathname = useMemo(() => {
    if (zone === "") {
      return pathname;
    }

    const zonePrefix = `/${zone}`;
    if (pathname.startsWith(zonePrefix)) {
      return pathname.slice(zonePrefix.length) || "/";
    }

    return pathname;
  }, [pathname, zone]);

  return zonePathname;
}
