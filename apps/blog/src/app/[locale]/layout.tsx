"use server";

import { FONT_CLASS_NAMES } from "@/app/fonts";
import { STATIC_MEDIA } from "@/constants/media";
import { ZONE_NAME } from "@/constants/zone";
import { ALL_LOCALE } from "@shared/constants/locale";
import MainLayout from "@shared/layouts/MainLayout";
import { getUserLocale } from "@shared/server-actions";
import type { AppLocale } from "@shared/types/locale";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getTranslations } from "next-intl/server";
// import { GoogleAnalytics } from "@next/third-parties/google";
import { AuthStatesProvider } from "@shared/auth";
import AssetPrefixFix from "@shared/layouts/AssetPrefixFix";
import DateTimeAndNumeralProvider from "@shared/providers/DateTimeAndNumeralProvider";
import MUIV6ThemeProvider, {
  InitColorScheme,
} from "@shared/providers/MUIV6ThemeProvider";
import NotiStackProvider from "@shared/providers/NotiStackProvider";
import ReactQueryProvider from "@shared/providers/ReactQueryProvider";
import type { PropsWithChildren } from "react";

type Params = Promise<{ locale: string }>;

type LocaleLayoutProps = PropsWithChildren<{
  params: Params;
}>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function RootLayout({
  children,
  params,
}: LocaleLayoutProps) {
  let { locale } = await params;

  if (!ALL_LOCALE.includes(locale as AppLocale)) {
    locale = await getUserLocale();
  }

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
        <AssetPrefixFix zoneName={ZONE_NAME} />
        <NextIntlClientProvider locale={locale}>
          <ReactQueryProvider>
            <MUIV6ThemeProvider locale={locale}>
              <DateTimeAndNumeralProvider locale={locale}>
                <NotiStackProvider>
                  <AuthStatesProvider>
                    <InitColorScheme />
                    <MainLayout locale={locale} zoneName={ZONE_NAME}>
                      {children}
                    </MainLayout>
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
