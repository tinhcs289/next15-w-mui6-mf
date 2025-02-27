"use client";

import { styled } from "@mui/material";
import type { TableRowProps } from "@mui/material/TableRow";
import MuiTableRow from "@mui/material/TableRow";
import type { Slot } from "../types";

const StyledTableHeadRow = styled(MuiTableRow)<TableRowProps>(({ theme }) => ({
  background:
    theme.palette.mode === "light" ? theme.palette.grey[300] : "transparent",
  boxShadow: theme.shadows[1],
  border: "none !important",
})) as Slot["headRow"];
StyledTableHeadRow.displayName = "StyledTableHeadRow";

export default StyledTableHeadRow;