"use server";

import { DEFAULT_LOCALE } from "@shared/constants/locale";
import { cookies } from "next/headers";

export async function getUserLocale(): Promise<string> {
  const cookieStore = await cookies();
  return cookieStore.get("NEXT_LOCALE")?.value || DEFAULT_LOCALE;
}
