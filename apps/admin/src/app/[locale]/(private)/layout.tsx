"use server";

import { FONT_CLASS_NAMES } from "@/app/fonts";
import { ENV_CONFIG } from "@/constants/environment";
import { STATIC_MEDIA } from "@/constants/media";
import PATHS from "@/constants/paths";
import type { PageParams } from "@/types/next-page";
import AuthGuardServerSide from "@packages/auth-guard/AuthGuardServerSide";
import { ALL_LOCALE } from "@shared/constants/locale";
import AdminLayout from "@shared/layouts/AdminLayout";
import { getUserLocale } from "@packages/server-actions";
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
import { Suspense, type PropsWithChildren } from "react";

type RootLayoutProps = PropsWithChildren<{
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

async function AsyncRootLayout({ children, params }: RootLayoutProps) {
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
        <AssetPrefixFix zoneName={ENV_CONFIG.zoneName} />
        <NextIntlClientProvider locale={locale}>
          <ReactQueryProvider>
            <MUIV6ThemeProvider locale={locale}>
              <DateTimeAndNumeralProvider locale={locale}>
                <NotiStackProvider>
                  <InitColorScheme />
                  <AdminLayout locale={locale} zoneName={ENV_CONFIG.zoneName}>
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

export default async function RootLayout(props: RootLayoutProps) {
  return (
    <Suspense>
      <AsyncRootLayout {...props} />
    </Suspense>
  );
}
