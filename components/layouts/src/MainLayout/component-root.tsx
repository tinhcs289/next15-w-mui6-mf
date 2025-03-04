import Box from "@mui/material/Box";
import type { AppLocale } from "@shared/types/locale";
import { InitAOS } from "@shared/animate-on-scroll";
import AppBar from "./AppBar";
import {
  CurrentUrlInitializer,
  LocaleInitializer,
  MainLayoutStatesProvider,
  ZoneNameInitializer,
} from "./context";
import type { MainLayoutProps } from "./types";

export function MainLayout({
  children,
  locale,
  currentUrl,
  zoneName,
}: MainLayoutProps) {
  return (
    <MainLayoutStatesProvider>
      <InitAOS />
      <ZoneNameInitializer state={zoneName} />
      <LocaleInitializer state={locale as AppLocale} />
      <CurrentUrlInitializer state={currentUrl} />
      <AppBar />
      <Box component="main">{children}</Box>
    </MainLayoutStatesProvider>
  );
}
