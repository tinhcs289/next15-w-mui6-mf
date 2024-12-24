"use server";

import { authDataSchema } from "@repo/constants/auth";
import { authCookie } from "@repo/auth";
import { AuthData } from "@repo/types/auth";
import matchesSchema from "@repo/utils/data-validate/matchesSchema";
import { cookies } from "next/headers";

function parseAuthCookie(value?: string): AuthData | null {
  if (!value) return null;
  try {
    const parsed = JSON.parse(value) as unknown as AuthData;
    if (!matchesSchema(parsed, authDataSchema)) return null;
    return parsed;
  } catch {
    return null;
  }
}

export default async function useAuthCookieServerSide() {
  const cookieStore = await cookies();
  const auth = cookieStore.get(encodeURIComponent(authCookie.key));
  return parseAuthCookie(auth?.value);
}