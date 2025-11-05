"use client";

import { useEffect } from "react";

export default function AssetPrefixFix({ zoneName }: { zoneName?: string }) {
  useEffect(() => {
    if (!zoneName) return;
    if (process.env.NODE_ENV !== "development") return;
    if (typeof window === "undefined") return;
    // @ts-ignore
    window.__next_asset_prefix__ = `/${zoneName}-static`;
  }, [zoneName]);
  return <></>;
}
