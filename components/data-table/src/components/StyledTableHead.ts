"use client";

import { styled } from "@mui/material";
import type { TableHeadProps } from "@mui/material/TableHead";
import MuiTableHead from "@mui/material/TableHead";
import type { Slot } from "../types";

const StyledTableHead = styled(MuiTableHead)<TableHeadProps>(({ theme }) => ({
  background:
    theme.palette.mode === "light"
      ? theme.palette.background.paper
      : "transparent",
})) as Slot["head"];
StyledTableHead.displayName = "StyledTableHead";

export default StyledTableHead;