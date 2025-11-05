"use server";

import { QS_RETURN_URL } from "@/constants/query-string";
import { PageParams, PageSearchParams } from "@/types/next-page";
import View from "@/views/SignInView";
import { decryptReturnUrlHash } from "@shared/server-actions";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Sign In",
    description: "description",
    other: {
      charset: "utf-8",
    },
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
