"use server";

import { AuthData } from "@packages/auth";
import wait from "@packages/utils/async/wait";

export async function verifyAuth(data?: AuthData | null) {
  if (!data) return false;
  await wait();
  return true;
}
