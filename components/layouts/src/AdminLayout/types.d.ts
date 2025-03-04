import type { AppLocale } from "@shared/types/locale";
import type { ReactNode } from "react";

export type AdminLayoutProps = {
  children?: ReactNode;
  locale?: string;
  zoneName?: string;
  currentUrl?: string;
};

export type AdminLayoutStates = {
  locale?: AppLocale;
  openAppbarDrawer?: boolean;
  currentUrl?: string;
  zoneName?: string;
  pageContentWidth?: {
    full?: number;
    visible?: number;
  };
  pageContentHeight?: {
    full?: number;
    visible?: number;
  };
}