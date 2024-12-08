import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { getTranslations } from "next-intl/server";

export default async function LocaleNotFound() {
  const t = await getTranslations("notfound")
  return (
    <Box>
      <Typography component="h1">{t("page-heading")}</Typography>
      <Typography variant="body1">{t("page-description")}</Typography>
    </Box>
  );
}