"use client";

import { styled } from "@mui/material";
import type { BoxProps } from "@mui/material/Box";
import Box from "@mui/material/Box";
import type { ComponentType } from "react";

const ButtonGrabToReOrderColumn = styled(Box)<BoxProps<"button">>(({ theme }) => ({
  height: "100%",
  width: theme.spacing(1.5),
  padding: 0,
  margin: 0,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flex: "0 0 auto",
  touchAction: "none",
  cursor: "grabbing",
  borderRadius: "5px",
  border: "none",
  outline: "none",
  appearance: "none",
  backgroundColor: "transparent",
  WebkitTapHighlightColor: "transparent",
  boxSizing: "border-box",
  "&:hover": {
    backgroundCColor: "rgba(0, 0, 0, 0.05)",
  },
  "&:focus-visible": {
    boxShadow: "0 0px 0px 2px #4c9ffe",
  },
  "& svg": {
    flex: "0 0 auto",
    margin: "auto",
    height: "100%",
    overflow: "visible",
    fill: "#919eab",
  },
})) as ComponentType<BoxProps<"button">>;
ButtonGrabToReOrderColumn.displayName = "ButtonGrabToReOrderColumn";

export default ButtonGrabToReOrderColumn;
