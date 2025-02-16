import getUserLocale from "@/server-actions/getUserLocale";
import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

export const viewport: Viewport = {
  initialScale: 1,
  width: "device-width",
  height: "device-height",
};


export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "this is page title",
    description: "this is meta-description",
    other: {
      charset: "utf-8",
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const locale = await getUserLocale();
  return (
    // <html lang={locale}>
    //   <head>
    //     <link rel="icon" href={STATIC_MEDIA.favicon} sizes="any" />
    //   </head>
    //   <body className={`${FONT_CLASS_NAMES}`}>{children}</body>
    // </html>
    <>{children}</>
  );
}
