"use server";

import { QS_RETURN_URL } from "@/constants/query-string";
import { PageParams, PageSearchParams } from "@/types/next-page";
import SignInView from "@/views/SignInView";
import { decryptReturnUrlHash } from "@packages/server-actions";
import type { Metadata } from "next";
import { Suspense } from "react";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Sign In",
    description: "description",
    other: {
      charset: "utf-8",
    },
  };
}

type SignInPageProps = {
  params: PageParams;
  searchParams: PageSearchParams;
};

const View = async ({ searchParams }: SignInPageProps) => {
  const returnUrlHash = (await searchParams)[QS_RETURN_URL] as string;
  const returnUrl = decryptReturnUrlHash(returnUrlHash);

  return <SignInView returnUrl={returnUrl} />;
};

export default async function Signin(props: SignInPageProps) {
  return (
    <Suspense>
      <View {...props} />
    </Suspense>
  );
}
