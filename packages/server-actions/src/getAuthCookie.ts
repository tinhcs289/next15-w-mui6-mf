"use server";

import { AuthPlainData, authCookie, authDataSchema, authDataUtils } from "@packages/auth";
import matchesSchema from "@packages/utils/data-validate/matchesSchema";
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
  const authData = authDataUtils.convertToStates(parsedValue);
  return authData
}
