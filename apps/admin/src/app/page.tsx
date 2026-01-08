"use server";

import { FONT_CLASS_NAMES } from "@/app/fonts";
import { STATIC_MEDIA } from "@/constants/media";
import { getUserLocale } from "@packages/server-actions";
import type { Metadata } from "next";
import { Suspense } from "react";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Hello",
    description: "description",
    other: {
      charset: "utf-8",
    },
  };
}

const View = async () => {
  const locale = await getUserLocale();
  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1"
        />
        <link rel="icon" href={STATIC_MEDIA.favicon} sizes="any" />
      </head>
      <body className={`${FONT_CLASS_NAMES}`}>
        <div>Hello</div>
      </body>
    </html>
  );
};

export default async function RootPage() {
  return (
    <Suspense>
      <View />
    </Suspense>
  );
}
