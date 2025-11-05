"use server";

import { FONT_CLASS_NAMES } from "@/app/fonts";
import { STATIC_MEDIA } from "@/constants/media";
import PATHS from "@/constants/paths";
import { ZONE_NAME } from "@/constants/zone";
import type { PageParams } from "@/types/next-page";
import AuthGuardServerSide from "@shared/auth-guard/AuthGuardServerSide";
import { ALL_LOCALE } from "@shared/constants/locale";
import AdminLayout from "@shared/layouts/AdminLayout";
import { getUserLocale } from "@shared/server-actions";
import type { AppLocale } from "@shared/types/locale";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getTranslations } from "next-intl/server";
// import { GoogleAnalytics } from "@next/third-parties/google";
import AssetPrefixFix from "@shared/layouts/AssetPrefixFix";
import DateTimeAndNumeralProvider from "@shared/providers/DateTimeAndNumeralProvider";
import MUIV6ThemeProvider, {
  InitColorScheme,
} from "@shared/providers/MUIV6ThemeProvider";
import NotiStackProvider from "@shared/providers/NotiStackProvider";
import ReactQueryProvider from "@shared/providers/ReactQueryProvider";
import type { PropsWithChildren } from "react";

type LocaleLayoutProps = PropsWithChildren<{
  params: PageParams;
}>;

export async function generateMetadata({
  params,
}: {
  params: PageParams;
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
        <AssetPrefixFix zoneName={ZONE_NAME}/>
        <NextIntlClientProvider locale={locale}>
          <ReactQueryProvider>
            <MUIV6ThemeProvider locale={locale}>
              <DateTimeAndNumeralProvider locale={locale}>
                <NotiStackProvider>
                  <InitColorScheme />
                  <AdminLayout locale={locale} zoneName={ZONE_NAME}>
                    <AuthGuardServerSide redirect={PATHS.signIn}>
                      {children}
                    </AuthGuardServerSide>
                  </AdminLayout>
                </NotiStackProvider>
              </DateTimeAndNumeralProvider>
            </MUIV6ThemeProvider>
          </ReactQueryProvider>
          {/* <GoogleAnalytics gaId="YOUR GAID GOES HERE" /> */}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
