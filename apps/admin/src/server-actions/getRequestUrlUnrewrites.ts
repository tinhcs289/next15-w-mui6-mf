"use server";

import { headers } from "next/headers";

export default async function getRequestUrlUnrewrites() {
  const headersList = await headers()
  const currentUrl = headersList.get("x-url-origin") || "";
  return currentUrl;
}