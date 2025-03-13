import AuthLayout from "@/components/layout/AuthLayout";
import DocumentBody from "@/components/layout/DocumentBody";
import { ZONE_NAME } from "@/constants/zone";
import { ALL_LOCALE } from "@shared/constants/locale";
import { getRequestUrl, getUserLocale } from "@shared/server-actions";
import type { AppLocale } from "@shared/types/locale";
import { NextIntlClientProvider } from "next-intl";
import type { ReactNode } from "react";

export default async function AuthPagesLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  let { locale } = await params;

  if (!ALL_LOCALE.includes(locale as AppLocale)) {
    locale = await getUserLocale();
  }

  const currentUrl = await getRequestUrl();

  return (
    <NextIntlClientProvider locale={locale}>
      <DocumentBody locale={locale}>
        <AuthLayout
          locale={locale}
          zoneName={ZONE_NAME}
          currentUrl={currentUrl}
        >
          {children}
        </AuthLayout>
      </DocumentBody>
    </NextIntlClientProvider>
  );
}
