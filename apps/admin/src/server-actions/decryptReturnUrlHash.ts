import aesCrypt from "@shared/utils/crypt/aesCrypt";

export default function decryptReturnUrlHash(
  hash?: string
) {
  if (!hash) return "";
  const hashedUrl = aesCrypt.decrypt(hash);
  return hashedUrl;
}