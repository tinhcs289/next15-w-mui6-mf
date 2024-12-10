import Box from "@mui/material/Box";
import { H1 } from "@repo/share-react/components/typo/h-tags";
import Typo from "@repo/share-react/components/typo/Typo";
import { getTranslations } from "next-intl/server";
import { headers } from "next/headers";

export default async function View({ locale }: { locale: string }) {
  const t = await getTranslations({
    locale,
    namespace: "notfound",
  });

  const headerStore = await headers();
  const url = headerStore.get("x-url");

  return (
    <Box
      minHeight="100svh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <H1>{t("page-heading")}</H1>
      <br />
      <Typo variant="body1">{`url: ${url}`}</Typo>
      <br />
      <Typo variant="body1">{t("page-description")}</Typo>
    </Box>
  );
}