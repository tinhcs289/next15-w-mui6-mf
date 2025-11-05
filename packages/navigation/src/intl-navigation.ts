import { ALL_LOCALE } from "@shared/constants/locale";
import { createNavigation } from "next-intl/navigation";

export const {
  Link,
  redirect,
  usePathname,
  useRouter,
  getPathname,
  permanentRedirect,
} = createNavigation({
  locales: ALL_LOCALE,
  localePrefix: "always",
});