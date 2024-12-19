'use server';

import { AppLocale } from '@repo/types/locale';
import { cookies } from 'next/headers';
import { DEFAULT_LOCALE } from './config';

// In this example the locale is read from a cookie. You could alternatively
// also read it from a database, backend service, or any other source.
const COOKIE_NAME = 'NEXT_LOCALE';

export async function getUserLocale() {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAME)?.value || DEFAULT_LOCALE;
}

export async function setUserLocale(locale: AppLocale) {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, locale);
}