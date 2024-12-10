import Box from "@mui/material/Box";
import type { AppLocale } from "@repo/types/locale";
import type { ReactNode } from "react";
import AppBar from "./AppBar";
import { LocaleInitializer, MainLayoutStatesProvider } from "./context";

export type MainLayoutProps = {
  children?: ReactNode;
  locale?: string;
  zoneName?: string;
};

export default function MainLayout({ children, locale }: MainLayoutProps) {
  return (
    <MainLayoutStatesProvider>
      <LocaleInitializer locale={locale as AppLocale} />
      <AppBar />
      <Box component="main">
        {children}
      </Box>
    </MainLayoutStatesProvider>
  );
}