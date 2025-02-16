"use client";

import { CssBaseline, GlobalStyles, THEME_ID, ThemeProvider } from "@mui/material";
import type { ReactNode } from "react";
import { theme } from "../customizations";
import { globalStyleMaker } from "../global-styles";

export default function ClientSideProvider({
  children,
}: {
  children?: ReactNode;
  locale?: string;
}) {
  return (
    <ThemeProvider theme={{ [THEME_ID]: theme }}>
      <CssBaseline enableColorScheme />
      <GlobalStyles styles={globalStyleMaker} />
      {children}
    </ThemeProvider>
  );
}
