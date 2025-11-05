"use server";

import { FONT_CLASS_NAMES } from "@/app/fonts";
import { STATIC_MEDIA } from "@/constants/media";
import { ZONE_NAME } from "@/constants/zone";
import { ALL_LOCALE } from "@shared/constants/locale";
import AuthLayout from "@shared/layouts/AuthLayout";
import { getRequestUrl, getUserLocale } from "@shared/server-actions";
import type { AppLocale } from "@shared/types/locale";
import { NextIntlClientProvider } from "next-intl";
// import { GoogleAnalytics } from "@next/third-parties/google";
import { AuthStatesProvider } from "@shared/auth";
import DateTimeAndNumeralProvider from "@shared/providers/DateTimeAndNumeralProvider";
import MUIV6ThemeProvider, {
  InitColorScheme,
} from "@shared/providers/MUIV6ThemeProvider";
import NotiStackProvider from "@shared/providers/NotiStackProvider";
import ReactQueryProvider from "@shared/providers/ReactQueryProvider";
import type { PropsWithChildren } from "react";

export default async function AuthPagesLayout({
  children,
  params,
}: PropsWithChildren<{
  params: Promise<{ locale: string }>;
}>) {
  let { locale } = await params;

  if (!ALL_LOCALE.includes(locale as AppLocale)) {
    locale = await getUserLocale();
  }

  const currentUrl = await getRequestUrl();

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
        <NextIntlClientProvider locale={locale}>
          <ReactQueryProvider>
            <MUIV6ThemeProvider locale={locale}>
              <DateTimeAndNumeralProvider locale={locale}>
                <NotiStackProvider>
                  <AuthStatesProvider>
                    <InitColorScheme />
                    <AuthLayout
                      locale={locale}
                      zoneName={ZONE_NAME}
                      currentUrl={currentUrl}
                    >
                      {children}
                    </AuthLayout>
                  </AuthStatesProvider>
                </NotiStackProvider>
              </DateTimeAndNumeralProvider>
            </MUIV6ThemeProvider>
          </ReactQueryProvider>
        </NextIntlClientProvider>
        {/* <GoogleAnalytics gaId="YOUR GAID GOES HERE" /> */}
      </body>
    </html>
  );
}
