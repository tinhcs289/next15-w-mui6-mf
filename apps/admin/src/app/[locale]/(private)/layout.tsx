import AuthGuardServerSide from "@/components/auth/AuthGuardServerSide";
import DocumentBody from "@/components/layout/DocumentBody";
import MainLayout from "@/components/layout/MainLayout";
import PATHS from "@/constants/paths";
import { ZONE_NAME } from "@/constants/zone";
import type { PageParams } from "@/types/next-page";
import { ALL_LOCALE } from "@shared/constants/locale";
import { getUserLocale } from "@shared/server-actions";
import type { AppLocale } from "@shared/types/locale";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";

type LocaleLayoutProps = {
  children: ReactNode;
  params: PageParams;
};

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
    <NextIntlClientProvider locale={locale}>
      <DocumentBody locale={locale}>
        <MainLayout locale={locale} zoneName={ZONE_NAME}>
          <AuthGuardServerSide redirect={PATHS.signIn}>
            {children}
          </AuthGuardServerSide>
        </MainLayout>
      </DocumentBody>
    </NextIntlClientProvider>
  );
}
