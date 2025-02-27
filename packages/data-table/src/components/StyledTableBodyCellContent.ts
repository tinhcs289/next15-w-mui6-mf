"use client";

import { styled } from "@mui/material";
import type { BoxProps } from "@mui/material/Box";
import Box from "@mui/material/Box";
import type { Slot } from "../types";

const StyledTableBodyCellContent = styled(Box)<BoxProps>(({ theme }) => ({
  display: "flex",
  boxSizing: "border-box",
  width: "100%",
  height: "100%",
  padding: theme.spacing(0.5),
  lineHeight: 1.2,
  fontSize: theme.spacing(1.5),
})) as Slot["bodyCellContent"];
StyledTableBodyCellContent.displayName = "StyledTableBodyCellContent";

export default StyledTableBodyCellContent;