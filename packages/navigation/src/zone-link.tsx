"use client";

import React, { useMemo, forwardRef } from "react";
import type {ComponentProps} from "react";
import { Link as IntlLink } from "./intl-navigation";

interface ZoneLinkProps extends ComponentProps<typeof IntlLink> {
  zone?: string;
  currentZone?: string;
}

export const ZoneLink = forwardRef<HTMLAnchorElement, ZoneLinkProps>(
  ({ zone, currentZone = "", href, ...otherProps }, ref) => {
    const targetZone = zone ?? currentZone;

    const zoneHref = useMemo(() => {
      if (typeof href !== "string") {
        return href;
      }

      const zonePrefix = targetZone === "" ? "" : `/${targetZone}`;
      if (href.startsWith(zonePrefix)) {
        return href;
      }
      return `${zonePrefix}${href.startsWith("/") ? href : "/" + href}`;
    }, [href, targetZone]);

    return <IntlLink ref={ref} {...otherProps} href={zoneHref} />;
  }
);

ZoneLink.displayName = "ZoneLink";