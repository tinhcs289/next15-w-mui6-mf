import { ZONE_NAME } from "@/constants/zone";
import AssetPrefixFix from "@shared/layouts/AssetPrefixFix";
import type { Viewport } from "next";
import type { PropsWithChildren } from "react";

export const viewport: Viewport = {
  initialScale: 1,
  width: "device-width",
  height: "device-height",
};

export default async function RootLayout({ children }: PropsWithChildren) {
  return (
    <>
      <AssetPrefixFix zoneName={ZONE_NAME} />
      {children}
    </>
  );
}
