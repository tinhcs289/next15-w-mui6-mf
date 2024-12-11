import Box from "@mui/material/Box";
import type { AppLocale } from "@repo/types/locale";
import type { ReactNode } from "react";
import AppBar from "./AppBar";
import {
  CurrentUrlInitializer,
  LocaleInitializer,
  MainLayoutStatesProvider,
  ZoneNameInitializer,
} from "./context";

export type MainLayoutProps = {
  children?: ReactNode;
  locale?: string;
  zoneName?: string;
  currentUrl?: string;
};

export default function MainLayout({ children, locale, currentUrl, zoneName }: MainLayoutProps) {
  return (
    <MainLayoutStatesProvider>
      <ZoneNameInitializer zoneName={zoneName} />
      <LocaleInitializer locale={locale as AppLocale} />
      <CurrentUrlInitializer currentUrl={currentUrl} />
      <AppBar />
      <Box component="main">{children}</Box>
    </MainLayoutStatesProvider>
  );
}