"use server";

import { AuthData } from "@shared/auth";
import wait from "@shared/utils/async/wait";

export async function verifyAuth(data?: AuthData | null) {
  if (!data) return false;
  await wait();
  return true;
}
