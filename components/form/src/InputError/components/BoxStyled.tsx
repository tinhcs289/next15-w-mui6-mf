"use client";

import { styled } from "@mui/material";
import type { BoxProps } from "@mui/material/Box";
import Box from "@mui/material/Box";

const BoxStyled = styled(Box)<BoxProps>(({ theme }) => ({
  transition: "all ease 0.3",
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(0.5),
}));
BoxStyled.displayName = "BoxStyled";

export default BoxStyled;