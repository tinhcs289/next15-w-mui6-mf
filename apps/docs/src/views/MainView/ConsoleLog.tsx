import getRequestUrl from "@/server-actions/getRequestUrl";
import getRequestUrlUnrewrites from "@/server-actions/getRequestUrlUnrewrites";
import Text from "@shared/typo/Text";

export default async function ConsoleLog() {
  const currentUrl = await getRequestUrl();
  const currentUrlOrigin = await getRequestUrlUnrewrites();

  return (
    <>
      <Text>Current url: {currentUrl}</Text>
      <Text>Current origin url: {currentUrlOrigin}</Text>
    </>
  );
}
