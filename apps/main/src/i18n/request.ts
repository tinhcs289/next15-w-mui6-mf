import { ALL_LOCALE } from "@shared/constants/locale";
import { getUserLocale } from "@shared/server-actions";
import type { AppLocale } from "@shared/types/locale";
import { getRequestConfig } from "next-intl/server";
import { LOCALE_KEYS } from "./config";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !ALL_LOCALE.includes(locale as AppLocale)) {
    locale = await getUserLocale();
  }

  const messages: { [x: string]: any } = {};

  await Promise.all(
    LOCALE_KEYS.map((key) =>
      (async () => {
        messages[key] = (
          await import(`./locales/${locale}/${key}.json`)
        ).default;
      })()
    )
  );

  return {
    locale,
    messages,
  };
});
