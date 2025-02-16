import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import type { AppLocale } from "@shared/types/locale";
import { InitAOS } from "@shared/utils-react/animate-on-scroll";
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
import type { AdminLayoutProps } from "./types";

export function AdminLayout({
  children,
  locale,
  currentUrl,
  zoneName,
}: AdminLayoutProps) {
  return (
    <AdminLayoutStatesProvider>
      <InitAOS />
      <ZoneNameInitializer state={zoneName} />
      <LocaleInitializer state={locale as AppLocale} />
      <CurrentUrlInitializer state={currentUrl} />
      <Box display="flex" height="100svh" width="100svw" p={0} m={0}>
        <SideMenu />
        <AppBar />
        <BoxMain component="main">
          <Stack
            height="100svh"
            position="relative"
            spacing={{ xs: 1, md: 2 }}
            alignItems="center"
            sx={{
              pb: 2,
              mx: { xs: 1, md: 2 },
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
