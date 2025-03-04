"use client";

import { alpha, styled } from "@mui/material";
import type { BoxProps } from "@mui/material/Box";
import Box from "@mui/material/Box";
import type { ComponentType } from "react";

const BoxMain = styled(Box)<BoxProps<"main">>(({ theme }) => ({
  flexGrow: 1,
  // @ts-ignore
  backgroundColor: theme.vars
    ? // @ts-ignore
      `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
    : // @ts-ignore
      alpha(theme.palette.background.default, 1),
  overflow: "hidden",
  height: "100svh",
  ...theme.applyStyles("dark", {
    backgroundImage:
      "radial-gradient(ellipse 80% 119% at 50% -20%, hsl(210, 100%, 30%), transparent)",
  }),
})) as ComponentType<BoxProps<"main">>;
BoxMain.displayName = "BoxMain";

export default BoxMain;