"use server";

import { AuthPlainData, authCookie, authDataSchema, formatAuth } from "@shared/auth";
import matchesSchema from "@shared/utils/data-validate/matchesSchema";
import { cookies } from "next/headers";

function parseAuthCookie(value?: string): AuthPlainData | null {
  if (!value) return null;
  try {
    const parsed = JSON.parse(value) as unknown as AuthPlainData;
    if (!matchesSchema(parsed, authDataSchema)) return null;
    return parsed;
  } catch {
    return null;
  }
}

export async function getAuthCookie() {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(encodeURIComponent(authCookie.key));
  const parsedValue = parseAuthCookie(cookie?.value);
  if (!parsedValue) return null;
  return formatAuth.get(parsedValue);
}
