import NotFoundView from "@/views/NotFoundView";
import { getUserLocale } from "@shared/server-actions";

export default async function LocaleNotFound() {
  const locale = await getUserLocale();
  return (
    <NotFoundView locale={locale} />
  );
}