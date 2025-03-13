import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import ClientSideProvider from "./components/ClientSideProvider";
import type { MUIV6ThemeProviderProps } from "./types";

export default function MUIV6ThemeProvider({
  children,
  locale,
  cacheProviderProps,
}: MUIV6ThemeProviderProps) {
  return (
    <AppRouterCacheProvider
      {...cacheProviderProps}
      options={{
        ...cacheProviderProps?.options,
        enableCssLayer: true,
        key: "css",
      }}
    >
      <ClientSideProvider locale={locale}>{children}</ClientSideProvider>
    </AppRouterCacheProvider>
  );
}
