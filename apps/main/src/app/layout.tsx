import type { Viewport } from "next";
import type { PropsWithChildren } from "react";

export const viewport: Viewport = {
  initialScale: 1,
  width: "device-width",
  height: "device-height",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return <>{children}</>;
}
