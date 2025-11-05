"use server";

import NotFoundView from "@/views/NotFoundView";
import { getUserLocale } from "@shared/server-actions";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Not Found",
    description: "description",
    other: {
      charset: "utf-8",
    },
  };
}

export default async function LocaleNotFound() {
  const locale = await getUserLocale();
  return <NotFoundView locale={locale} />;
}
