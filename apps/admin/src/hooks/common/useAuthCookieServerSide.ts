"use server";

import { authDataSchema } from "@shared/constants/auth";
import { authCookie } from "@shared/auth";
import { AuthData } from "@shared/types/auth";
import matchesSchema from "@shared/utils/data-validate/matchesSchema";
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
