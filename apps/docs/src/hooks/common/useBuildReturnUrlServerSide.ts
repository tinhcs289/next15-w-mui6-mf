"use server";

import { QS_RETURN_URL } from "@/constants/query-string";
import aesCrypt from "@repo/utils/crypt/aesCrypt";
import { headers } from "next/headers";
import { stringify } from "qs";

export default async function useBuildReturnUrlServerSide(
  redirectUrl?: string
) {
  const heads = await headers();
  const requestUrl = heads.get("x-url") || "";
  const hashedUrl = aesCrypt.encrypt(requestUrl);

  if (!redirectUrl) return "";
  if (redirectUrl.indexOf("?") === -1) return "";

  return `${redirectUrl}&${stringify(
    { [QS_RETURN_URL]: hashedUrl || null },
    { skipNulls: true }
  )}`;
}