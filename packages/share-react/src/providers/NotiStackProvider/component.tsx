"use client";

import Slide from "@mui/material/Slide";
import { SnackbarProvider } from "notistack";
import type { NotiStackProviderProps } from "./types";

export default function NotiStackProvider({
  children,
  ...otherProps
}: NotiStackProviderProps) {
  return (
    <SnackbarProvider
      dense
      preventDuplicate
      maxSnack={20}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      TransitionComponent={Slide}
      {...otherProps}
    >
      {children}
    </SnackbarProvider>
  );
}