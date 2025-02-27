"use client";

import { alpha, styled } from "@mui/material";
import type { TableBodyProps } from "@mui/material/TableBody";
import MuiTableBody from "@mui/material/TableBody";
import type { Slot } from "../types";

const StyledTableBody = styled(MuiTableBody)<TableBodyProps>(({ theme }) => ({
  background:
    theme.palette.mode === "light"
      ? theme.palette.grey[100]
      : alpha(theme.palette.background.paper, 0.5),
})) as Slot["body"];
StyledTableBody.displayName = "StyledTableBody";

export default StyledTableBody;