"use client";

import type { Theme } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import { useMemo } from "react";

export default function useAutoFullWidthOnSmallScreen(fullscreenByDefault?: boolean) {
  const isSmallScreenOrSmaller = useMediaQuery((theme: Theme) =>
    theme?.breakpoints?.down?.("sm")
  );
  const fullScreenState = useMemo(() => {
    if (fullscreenByDefault === true) return true;
    if (isSmallScreenOrSmaller) return true;
    return false;
  }, [fullscreenByDefault, isSmallScreenOrSmaller]);

  return fullScreenState;
}