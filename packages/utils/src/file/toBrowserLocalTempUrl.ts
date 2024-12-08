export default function toBrowserLocalTempUrl(
  base64Content: string,
  blobOptions?: BlobPropertyBag
) {
  if (!base64Content) return "";
  const bytes = atob(base64Content);
  let length = bytes.length;
  // eslint-disable-next-line prefer-const
  let out = new Uint8Array(length);
  while (length--) {
    out[length] = bytes.charCodeAt(length);
  }
  const blob = new Blob([out], blobOptions);
  return URL.createObjectURL(blob);
}