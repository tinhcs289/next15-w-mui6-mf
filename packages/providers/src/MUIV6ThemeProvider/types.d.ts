import type { AppRouterCacheProviderProps } from "@mui/material-nextjs/v15-appRouter";
import type { ReactNode } from "react";

export type MUIV6ThemeProviderProps = {
  children?: ReactNode;
  locale?: string;
  cacheProviderProps?: Partial<AppRouterCacheProviderProps>
}