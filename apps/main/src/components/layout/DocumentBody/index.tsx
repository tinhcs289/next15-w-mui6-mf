import { FONT_CLASS_NAMES } from "@/app/fonts";
import { STATIC_MEDIA } from '@/constants/media';
// import { GoogleAnalytics } from "@next/third-parties/google";
import { AuthStoreProvider } from "@repo/share-react/auth";
import DateTimeAndNumeralProvider from "@repo/share-react/providers/DateTimeAndNumeralProvider";
import MUIV6ThemeProvider from "@repo/share-react/providers/MUIV6ThemeProvider";
import NotiStackProvider from "@repo/share-react/providers/NotiStackProvider";
import ReactQueryProvider from "@repo/share-react/providers/ReactQueryProvider";
import type { ReactNode } from "react";

export type DocumentBodyProps = {
  children: ReactNode;
  locale: string;
};

export default function DocumentBody({ children, locale }: DocumentBodyProps) {
  return (
    <html lang={locale}>
      <head>
        <link rel="icon" href={STATIC_MEDIA.favicon} sizes="any" />
      </head>

      <ReactQueryProvider>
        <MUIV6ThemeProvider locale={locale}>
          <DateTimeAndNumeralProvider locale={locale}>
            <NotiStackProvider>
              <AuthStoreProvider>
                <body className={`${FONT_CLASS_NAMES}`}>{children}</body>
              </AuthStoreProvider>
            </NotiStackProvider>
          </DateTimeAndNumeralProvider>
        </MUIV6ThemeProvider>
      </ReactQueryProvider>
      {/* <GoogleAnalytics gaId="YOUR GAID GOES HERE" /> */}
    </html>
  );
}
