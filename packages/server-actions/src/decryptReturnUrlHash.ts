import aesCrypt from "@packages/utils/crypt/aesCrypt";

export function decryptReturnUrlHash(
  hash?: string
) {
  if (!hash || hash === "null" || hash === "undefined") return undefined;
  const hashedUrl = aesCrypt.decrypt(hash);
  return hashedUrl;
}