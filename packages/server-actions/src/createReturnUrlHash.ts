"use server";

import aesCrypt from "@packages/utils/crypt/aesCrypt";
import last from "lodash/last";
import { headers } from "next/headers";
import { stringify } from "qs";

export async function createReturnUrlHash(redirectUrl?: string) {
  if (!redirectUrl) return undefined;

  const heads = await headers();
  const requestUrl = heads.get("x-url");
  if (!requestUrl) return undefined;

  const operator =
    redirectUrl.indexOf("?") === -1
      ? "?"
      : last(redirectUrl) === "&"
        ? ""
        : "&";

  return `${redirectUrl}${operator}${stringify({ ["return-url"]: aesCrypt.encrypt(requestUrl) })}`;
}
