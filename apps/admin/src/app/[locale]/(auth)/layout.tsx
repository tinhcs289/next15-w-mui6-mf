"use server";

import { FONT_CLASS_NAMES } from "@/app/fonts";
import { ENV_CONFIG } from "@/constants/environment";
import { STATIC_MEDIA } from "@/constants/media";
import { AuthStatesProvider, VerifyAuthCallbackInitializer } from "@packages/auth";
import { ALL_LOCALE } from "@shared/constants/locale";
import AuthLayout from "@shared/layouts/AuthLayout";
import { getRequestUrl, getUserLocale } from "@packages/server-actions";
import type { AppLocale } from "@shared/types/locale";
import { NextIntlClientProvider } from "next-intl";
// import { GoogleAnalytics } from "@next/third-parties/google";
import AssetPrefixFix from "@shared/layouts/AssetPrefixFix";
import DateTimeAndNumeralProvider from "@shared/providers/DateTimeAndNumeralProvider";
import MUIV6ThemeProvider, {
  InitColorScheme,
} from "@shared/providers/MUIV6ThemeProvider";
import NotiStackProvider from "@shared/providers/NotiStackProvider";
import ReactQueryProvider from "@shared/providers/ReactQueryProvider";
import { Suspense, type PropsWithChildren } from "react";

type AuthPagesLayoutProps = PropsWithChildren<{
  params: Promise<{ locale: string }>;
}>;

async function AsyncAuthPagesLayout({
  children,
  params,
}: AuthPagesLayoutProps) {
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
        <AssetPrefixFix zoneName={ENV_CONFIG.zoneName} />
        <NextIntlClientProvider locale={locale}>
          <ReactQueryProvider>
            <MUIV6ThemeProvider locale={locale}>
              <DateTimeAndNumeralProvider locale={locale}>
                <NotiStackProvider>
                  <InitColorScheme />
                  <AuthStatesProvider>
                    <VerifyAuthCallbackInitializer />
                    <AuthLayout
                      locale={locale}
                      zoneName={ENV_CONFIG.zoneName}
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

export default async function AuthPagesLayout(props: AuthPagesLayoutProps) {
  return (
    <Suspense>
      <AsyncAuthPagesLayout {...props} />
    </Suspense>
  );
}
