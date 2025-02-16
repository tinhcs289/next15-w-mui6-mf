"use client";

import { styled } from "@mui/material";
import type { BoxProps } from "@mui/material/Box";
import Box from "@mui/material/Box";
import type { ComponentType } from "react";

export const BoxStack = styled(Box)<BoxProps<"div">>({
  flexGrow: 1,
  display: "flex",
}) as ComponentType<BoxProps<"div">>;
BoxStack.displayName = "BoxStack";

export const BoxItem = styled(Box)<BoxProps<"div">>({
  flexShrink: 0,
  display: "grid",
  placeItems: "center",
  transform: "filter 0.2s ease-out, background-color 0.2s ease-out",
}) as ComponentType<BoxProps<"div">>;
BoxItem.displayName = "BoxItem";

export const BoxItemLast = styled(Box)<BoxProps<"div">>({
  flexGrow: 1,
}) as ComponentType<BoxProps<"div">>;
BoxItemLast.displayName = "BoxItemLast";

export const BoxSpliter = styled(Box, {
  shouldForwardProp: (p) => p !== "axis" && p !== "isDragging",
})<
  BoxProps & {
    axis?: "x" | "y";
    isDragging?: boolean;
  }
>(({ theme, isDragging, axis }) => ({
  zIndex: 1,
  flexSShrink: 0,
  width: axis === "x" ? theme.spacing(0.5) : "100%",
  height: axis === "y" ? theme.spacing(0.5) : "100%",
  cursor: axis === "x" ? "col-resize" : "row-resize",
  transition: "background-color 0.15s 0.15s ease-in-out",
  backgroundColor: !isDragging
    ? theme.palette.grey[300]
    : theme.palette.primary.main,
  ["&:hover"]: {
    backgroundColor: !isDragging
      ? theme.palette.primary.main
      : theme.palette.primary.light,
  },
})) as ComponentType<
  BoxProps & {
    axis?: "x" | "y";
    isDragging?: boolean;
  }
>;
BoxSpliter.displayName = "BoxSpliter";