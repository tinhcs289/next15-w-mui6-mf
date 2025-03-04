"use client";

import { styled } from "@mui/material";
import type { BoxProps } from "@mui/material/Box";
import Box from "@mui/material/Box";
import type { ComponentType } from "react";
import { useHeaderDndHandle } from "../context";

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


export default function ColumnDndHandle() {
  const { enable, handleProps, handleRef } = useHeaderDndHandle();
  return !enable ? null : (
    <ButtonGrabToReOrderColumn {...handleProps} component="button" ref={handleRef}>
      <svg viewBox="0 0 20 20" width="12">
        <path d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z"></path>
      </svg>
    </ButtonGrabToReOrderColumn>
  );
}