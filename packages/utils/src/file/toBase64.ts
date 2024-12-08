/* eslint-disable @typescript-eslint/no-unused-vars */
export default async function toBase64(
  file: File | Blob
): Promise<string | null> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return new Promise((resolve, _reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      const base64 = reader.result;
      resolve(`${base64}`);
    };
    reader.onerror = function (_error) {
      resolve(null);
    };
  });
}