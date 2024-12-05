"use client"

export default async function downloadFile(args: {
  source: string;
  saveAs: string;
  fetchOptions?: Parameters<typeof fetch>[1];
}) {
  const { source, saveAs, fetchOptions } = args;
  if (!document?.body) return;
  if (!source || !source.trim()) return false;
  if (!saveAs || !saveAs.trim()) return false;

  let getBlob = undefined;

  try {
    const response = await fetch(source, fetchOptions);
    if (!response || response.status !== 200) throw response as unknown;
    getBlob = response?.blob;
  } catch {
    return false;
  }

  if (!getBlob) return false;

  try {
    const blob = await getBlob();
    if (!blob) throw blob as unknown;

    const url = window.URL.createObjectURL(blob);
    if (!url) throw null as unknown;

    const tempATag = document.createElement("a");
    tempATag.style.display = "none";
    tempATag.href = url;
    tempATag.download = saveAs;
    document.body.appendChild(tempATag);
    tempATag.click();
    window.URL.revokeObjectURL(url);
    tempATag.remove();
    return true;
  } catch {
    return false;
  }
}