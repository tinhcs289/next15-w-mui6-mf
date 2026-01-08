"use server";

import NotFoundView from "@/views/NotFoundView";
import { getUserLocale } from "@packages/server-actions";
import type { Metadata } from "next";
import { Suspense } from "react";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Not Found",
    description: "description",
    other: {
      charset: "utf-8",
    },
  };
}

const View = async () => {
  const locale = await getUserLocale();
  return <NotFoundView locale={locale} />;
};

export default async function LocaleNotFound() {
  return (
    <Suspense>
      <View />
    </Suspense>
  );
}
