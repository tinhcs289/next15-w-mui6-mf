import Stack from "@mui/material/Stack";
import type { AppLocale } from "@shared/types/locale";
import { InitAOS } from "@shared/utils-react/animate-on-scroll";
import Content from "./components/Content";
import StackRoot from "./components/StackRoot";
import {
  AuthLayoutStatesProvider,
  CurrentUrlInitializer,
  LocaleInitializer,
  ZoneNameInitializer,
} from "./context";
import type { AuthLayoutProps } from "./types";

export function AuthLayout({
  children,
  locale,
  currentUrl,
  zoneName,
}: AuthLayoutProps) {
  return (
    <AuthLayoutStatesProvider>
      <InitAOS />
      <ZoneNameInitializer state={zoneName} />
      <LocaleInitializer state={locale as AppLocale} />
      <CurrentUrlInitializer state={currentUrl} />
      <StackRoot
        direction="column"
        component="main"
        sx={{
          height: "100svh",
          width: "100svw",
          margin: 0,
          // backgroundImage: (theme) =>
          //   theme.palette.mode === "dark"
          //     ? "linear-gradient(to left, #111823, #112035, #0f2748, #0e2f5b, #10366f)"
          //     : "linear-gradient(to left, #0f4089, #006fb7, #009fda, #00cff1, #00fffd)",
        }}
      >
        <Stack
          direction={{ xs: "column-reverse", md: "row" }}
          sx={{
            justifyContent: "center",
            gap: { xs: 6, sm: 12 },
            p: 2,
            mx: "auto",
          }}
        >
          <Stack
            direction={{ xs: "column-reverse", md: "row" }}
            sx={{
              justifyContent: "center",
              gap: { xs: 6, sm: 12 },
              p: { xs: 2, sm: 4 },
              m: "auto",
            }}
          >
            <Content />
            {children}
          </Stack>
        </Stack>
      </StackRoot>
    </AuthLayoutStatesProvider>
  );
}
