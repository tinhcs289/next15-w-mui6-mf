import { ALL_LOCALE, DEFAULT_LOCALE as REPO_DEFAULT_LOCALE } from "@repo/constants/locale";
import type { LocalePrefix } from "next-intl/routing";

export const DEFAULT_LOCALE = REPO_DEFAULT_LOCALE;

export const LOCALE_PREFIX_PATH = ALL_LOCALE.map((l) => `/${l}`);

export const INTL_LOCALE_PREFIX: LocalePrefix<typeof ALL_LOCALE> = "always";

export const LOCALE_KEYS = ['metadata' ,'common', 'notfound']; // add more key here