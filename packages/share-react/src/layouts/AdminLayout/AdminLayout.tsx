import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import type { AppLocale } from "@repo/types/locale";
import type { ReactNode } from "react";
import AppBar from "./AppBar";
import Header from "./Header";
import SideMenu from "./SideMenu";
import BoxMain from "./components/BoxMain";
import {
  AdminLayoutStatesProvider,
  CurrentUrlInitializer,
  LocaleInitializer,
  ZoneNameInitializer,
} from "./context";

export type AdminLayoutProps = {
  children?: ReactNode;
  locale?: string;
  zoneName?: string;
  currentUrl?: string;
};

export default function AdminLayout({ children, locale, currentUrl, zoneName }: AdminLayoutProps) {
  return (
    <AdminLayoutStatesProvider>
      <ZoneNameInitializer zoneName={zoneName} />
      <LocaleInitializer locale={locale as AppLocale} />
      <CurrentUrlInitializer currentUrl={currentUrl} />
      <Box sx={{ display: "flex" }}>
        <SideMenu />
        <AppBar />
        <BoxMain component="main">
          <Stack
            spacing={2}
            sx={{
              alignItems: "center",
              mx: 3,
              pb: 5,
              mt: { xs: 8, md: 0 },
            }}
          >
            <Header />
            {children}
          </Stack>
        </BoxMain>
      </Box>
    </AdminLayoutStatesProvider>
  );
}