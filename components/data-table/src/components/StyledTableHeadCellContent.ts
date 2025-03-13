"use client";

import { styled } from "@mui/material";
import type { BoxProps } from "@mui/material/Box";
import Box from "@mui/material/Box";
import type { Slot } from "../types";

const StyledTableHeadCellContent = styled(Box)<BoxProps>(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(0.5),
  boxSizing: "border-box",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  height: "100%",
  padding: theme.spacing(0.5),
  margin: "0 !important",
  position: "relative",
})) as Slot["headCellContent"];
StyledTableHeadCellContent.displayName = "StyledTableHeadCellContent";

export default StyledTableHeadCellContent;