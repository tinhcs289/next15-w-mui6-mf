import Typo from "@repo/share-react/components/typo/Typo";
import { headers } from "next/headers";

export default async function ConsoleLog() {
  const headersList = await headers()
  const currentUrl = headersList.get('x-url')

  return <Typo>Current url: {currentUrl}</Typo>
}