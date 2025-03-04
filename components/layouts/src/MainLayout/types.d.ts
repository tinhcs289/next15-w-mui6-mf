import type { AppLocale } from "@shared/types/locale";
import type { ReactNode } from "react";

export type MainLayoutStates = {
  locale?: AppLocale;
  openAppbarDrawer?: boolean;
  currentUrl?: string;
  zoneName?: string;
};


export type MainLayoutProps = {
  children?: ReactNode;
  locale?: string;
  zoneName?: string;
  currentUrl?: string;
};
