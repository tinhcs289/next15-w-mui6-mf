"use client";

import { styled } from "@mui/material";
import type { BoxProps } from "@mui/material/Box";
import Box from "@mui/material/Box";
import type { Slot } from "../types";

const StyledTableHeadCellLabel = styled(Box)<BoxProps>(() => ({
  flex: 1,
  boxSizing: "border-box",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
})) as Slot["headCellLabel"];
StyledTableHeadCellLabel.displayName = "StyledTableHeadCellLabel";

export default StyledTableHeadCellLabel;