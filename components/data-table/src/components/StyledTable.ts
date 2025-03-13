"use client";

import { styled } from "@mui/material";
import type { TableProps } from "@mui/material/Table";
import MuiTable from "@mui/material/Table";
import type { Slot } from "../types";

const StyledTable = styled(MuiTable)<TableProps>(({ theme }) => ({
  tableLayout: "fixed",
  borderCollapse: "collapse",
})) as Slot["table"];
StyledTable.displayName = "StyledTable";

export default StyledTable;