'use server';

import { AppLocale } from '@shared/types/locale';
import { cookies } from 'next/headers';

export default async function setUserLocale(locale: AppLocale) {
  const cookieStore = await cookies();
  cookieStore.set("NEXT_LOCALE", locale);
}