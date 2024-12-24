import type { AppRouterCacheProviderProps } from '@mui/material-nextjs/v15-appRouter';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import type { ReactNode } from 'react';
import ClientSideProvider from './ClientSideProvider';

export type MUIV6ThemeProviderProps = {
  children?: ReactNode;
  locale?: string;
  cacheProviderProps?: Partial<AppRouterCacheProviderProps>
}

export default function MUIV6ThemeProvider({
  children,
  locale,
  cacheProviderProps,
}: MUIV6ThemeProviderProps) {
  return (
    <AppRouterCacheProvider
      {...cacheProviderProps}
      options={{ ...cacheProviderProps?.options, enableCssLayer: true }}
    >
      <ClientSideProvider locale={locale}>{children}</ClientSideProvider>
    </AppRouterCacheProvider>
  );
}
