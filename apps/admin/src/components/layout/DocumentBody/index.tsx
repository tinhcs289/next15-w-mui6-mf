import { FONT_CLASS_NAMES } from "@/app/fonts";
import { STATIC_MEDIA } from "@/constants/media";
// import { GoogleAnalytics } from "@next/third-parties/google";
import DateTimeAndNumeralProvider from "@shared/providers/DateTimeAndNumeralProvider";
import MUIV6ThemeProvider, { InitColorScheme } from "@shared/providers/MUIV6ThemeProvider";
import NotiStackProvider from "@shared/providers/NotiStackProvider";
import ReactQueryProvider from "@shared/providers/ReactQueryProvider";
import type { ReactNode } from "react";

type DocumentBodyProps = {
  children: ReactNode;
  locale: string;
};

export default function DocumentBody({ children, locale }: DocumentBodyProps) {
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

      <ReactQueryProvider>
        <MUIV6ThemeProvider locale={locale}>
          <DateTimeAndNumeralProvider locale={locale}>
            <NotiStackProvider>
              <>
                <body className={`${FONT_CLASS_NAMES}`}>
                  <InitColorScheme />
                  {children}
                </body>
              </>
            </NotiStackProvider>
          </DateTimeAndNumeralProvider>
        </MUIV6ThemeProvider>
      </ReactQueryProvider>
      {/* <GoogleAnalytics gaId="YOUR GAID GOES HERE" /> */}
    </html>
  );
}
