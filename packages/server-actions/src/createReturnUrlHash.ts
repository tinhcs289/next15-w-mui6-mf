"use server";

import aesCrypt from "@shared/utils/crypt/aesCrypt";
import last from "lodash/last";
import { headers } from "next/headers";
import { stringify } from "qs";

const QS_RETURN_URL = "return-url";

export async function createReturnUrlHash(
  redirectUrl?: string
) {
  const heads = await headers();
  const requestUrl = heads.get("x-url") || "";
  const hashedUrl = aesCrypt.encrypt(requestUrl);

  const redirectUrlParams = stringify(
    { [QS_RETURN_URL]: hashedUrl || null },
    { skipNulls: true }
  );

  if (!redirectUrl) return redirectUrlParams;

  const operator = redirectUrl.indexOf("?") === -1 ? "?" : last(redirectUrl) === "&" ? "" : "&";

  return `${redirectUrl}${operator}${redirectUrlParams}`;
}