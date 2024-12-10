import { getUserLocale } from "@/i18n/server-actions";
import NotFoundView from "@/views/NotFoundView";

export default async function LocaleNotFound() {
  const locale = await getUserLocale();
  return (
    <NotFoundView locale={locale} />
  );
}