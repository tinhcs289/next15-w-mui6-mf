import DocumentBody from "@/components/layout/DocumentBody";
import MainLayout from "@/components/layout/MainLayout";
import { ZONE_NAME } from "@/constants/zone";
import { getUserLocale } from "@/i18n/server-actions";
import { ALL_LOCALE } from "@repo/constants/locale";
import type { AppLocale } from "@repo/types/locale";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";

import { NextIntlClientProvider } from 'next-intl';

type Params = Promise<{ locale: string }>

type LocaleLayoutProps = {
  children: ReactNode;
  params: Params;
};

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function RootLayout({ children, params }: LocaleLayoutProps) {
  let { locale } = await params;

  if (!ALL_LOCALE.includes(locale as AppLocale)) {
    locale = await getUserLocale();
  }

  return (
    <NextIntlClientProvider locale={locale}>
      <DocumentBody locale={locale}>
        <MainLayout locale={locale} zoneName={ZONE_NAME}>
          {children}
        </MainLayout>
      </DocumentBody>
    </NextIntlClientProvider>
  );
}
