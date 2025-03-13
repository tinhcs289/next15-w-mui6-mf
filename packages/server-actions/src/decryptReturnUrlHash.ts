import aesCrypt from "@shared/utils/crypt/aesCrypt";

export function decryptReturnUrlHash(
  hash?: string
) {
  if (!hash) return "";
  const hashedUrl = aesCrypt.decrypt(hash);
  return hashedUrl;
}