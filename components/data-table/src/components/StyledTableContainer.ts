"use client";

import { styled } from "@mui/material";
import type { TableContainerProps } from "@mui/material/TableContainer";
import TableContainer from "@mui/material/TableContainer";
import type { Slot } from "../types";

const StyledTableContainer = styled(TableContainer)<TableContainerProps>(({ theme }) => ({
  boxSizing: "border-box",
  ...theme.applyStyles("dark", {
    background: "transparent",
    boxShadow: theme.shadows[12],
  }),
  ...theme.applyStyles("light", {
    background: theme.palette.grey[100],
    border: `1px solid ${theme.palette.grey[200]}`,
  }),
})) as Slot["container"];
StyledTableContainer.displayName = "StyledTableContainer";

export default StyledTableContainer;