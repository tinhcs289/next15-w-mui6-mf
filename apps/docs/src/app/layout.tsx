import { FONT_CLASS_NAMES } from "@/app/fonts";
import { STATIC_MEDIA } from "@/constants/media";
import { DEFAULT_LOCALE } from "@/i18n/config";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import type { ReactNode } from "react";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "this is page title",
    description: "this is meta-description",
  };
}

export default async function RootLayout({
  children,
} : {
  children: ReactNode;
}) {
  const cookieStore = await cookies();
  const lang = cookieStore.get("NEXT_LOCALE")?.value || DEFAULT_LOCALE;
  return (
    <html lang={lang}>
      <head>
        <link rel="icon" href={STATIC_MEDIA.favicon} sizes="any" />
      </head>
      <body className={`${FONT_CLASS_NAMES}`}>{children}</body>
    </html>
  );
}
