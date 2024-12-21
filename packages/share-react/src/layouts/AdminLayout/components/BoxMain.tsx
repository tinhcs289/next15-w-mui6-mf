"use client";

import { styled, alpha } from "@mui/material";
import Box from "@mui/material/Box";
import type { BoxProps } from "@mui/material/Box";

const BoxMain = styled(Box)<BoxProps<"main">>(({ theme }) => ({
  flexGrow: 1,
  // @ts-ignore
  backgroundColor: theme.vars
    ? // @ts-ignore
      `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
    : // @ts-ignore
      alpha(theme.palette.background.default, 1),
  overflow: "auto",
})) as typeof Box<"main">;

export default BoxMain;