"use client";

import { FONT_CLASS_NAMES } from "@/app/fonts";
import { STATIC_MEDIA } from "@/constants/media";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Error",
  description: "description",
  other: {
    charset: "utf-8",
  },
};

export default function RootError() {
  return (
    <html suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1"
        />
        <link rel="icon" href={STATIC_MEDIA.favicon} sizes="any" />
      </head>
      <body className={`${FONT_CLASS_NAMES}`}>
        <div>Error</div>
      </body>
    </html>
  );
}
