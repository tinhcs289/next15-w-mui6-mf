import { FONT_CLASS_NAMES } from "@/app/fonts";
import { STATIC_MEDIA } from '@/constants/media';
import { GoogleAnalytics } from "@next/third-parties/google";
import { DEFAULT_LOCALE } from "@repo/constants/locale";
import { AuthStoreProvider } from "@repo/share-react/auth";
import DateTimeAndNumeralProvider from "@repo/share-react/providers/DateTimeAndNumeralProvider";
import MUIV6ThemeProvider from "@repo/share-react/providers/MUIV6ThemeProvider";
import NotiStackProvider from "@repo/share-react/providers/NotiStackProvider";
import ReactQueryProvider from "@repo/share-react/providers/ReactQueryProvider";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Docs App",
    description: "this is meta-description",
  };
}

export default function RootLayout({
  children,
} : {
  children: ReactNode;
}) {
  return (
    <html lang={DEFAULT_LOCALE}>
      <head>
        <link rel="icon" href={STATIC_MEDIA.favicon} sizes="any" />
      </head>
      <ReactQueryProvider>
        <MUIV6ThemeProvider locale={DEFAULT_LOCALE}>
          <DateTimeAndNumeralProvider locale={DEFAULT_LOCALE}>
            <NotiStackProvider>
              <AuthStoreProvider>
                <body className={`${FONT_CLASS_NAMES}`}>{children}</body>
              </AuthStoreProvider>
            </NotiStackProvider>
          </DateTimeAndNumeralProvider>
        </MUIV6ThemeProvider>
      </ReactQueryProvider>
      <GoogleAnalytics gaId="YOUR GAID GOES HERE" />
    </html>
  );
}
