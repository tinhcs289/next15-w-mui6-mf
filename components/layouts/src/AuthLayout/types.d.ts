import type { AppLocale } from "@shared/types/locale";
import type { ReactNode } from "react";

export type AuthLayoutProps = {
  children?: ReactNode;
  locale?: string;
  zoneName?: string;
  currentUrl?: string;
};

export type AuthLayoutStates = {
  locale?: AppLocale;
  currentUrl?: string;
  zoneName?: string;
}