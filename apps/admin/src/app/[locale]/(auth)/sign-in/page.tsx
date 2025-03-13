"use server";

import { QS_RETURN_URL } from "@/constants/query-string";
import { PageParams, PageSearchParams } from "@/types/next-page";
import View from "@/views/SignInView";
import { decryptReturnUrlHash } from "@shared/server-actions";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params
}: {
  params: PageParams;
    searchParams: PageSearchParams;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("title"),
    description: t("description"),
  };
}


export default async function Signin({ searchParams }: {
  params: PageParams;
  searchParams: PageSearchParams;
}) {
  const returnUrlHash = (await searchParams)[QS_RETURN_URL] as string;
  const returnUrl = decryptReturnUrlHash(returnUrlHash);

  return <View returnUrl={returnUrl} />;
}
