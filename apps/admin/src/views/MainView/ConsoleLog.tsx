import getRequestUrl from "@/server-actions/getRequestUrl";
import getRequestUrlUnrewrites from "@/server-actions/getRequestUrlUnrewrites";
import Typo from "@repo/share-react/components/typo/Typo";

export default async function ConsoleLog() {
  const currentUrl = await getRequestUrl();
  const currentUrlOrigin = await getRequestUrlUnrewrites();

  return (
    <>
      <Typo>Current url: {currentUrl}</Typo>
      <Typo>Current origin url: {currentUrlOrigin}</Typo>
    </>
  );
}