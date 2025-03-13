"use client";

import { styled } from "@mui/material";
import { checkboxClasses } from "@mui/material/Checkbox";
import type { TableCellProps } from "@mui/material/TableCell";
import MuiTableCell from "@mui/material/TableCell";
import type { Slot } from "../types";

const StyledTableBodyCell = styled(MuiTableCell)<TableCellProps>(({ theme }) => ({
  padding: 0,
  userSelect: "none",
  borderBottomColor:
    theme.palette.mode === "light"
      ? theme.palette.grey[200]
      : theme.palette.grey[700],
  "&:not(:last-child)": {
    position: "relative",

    "&::after": {
      content: "''",
      display: "block",
      position: "absolute",
      userSelect: "none",
      top: "50%",
      transform: "translateY(-50%)",
      right: 0,
      width: "1px",
      height: "100%",
      background:
        theme.palette.mode === "light"
          ? theme.palette.grey[200]
          : theme.palette.grey[700],
    },
  },
  [`.${checkboxClasses.root}`]: {
    margin: 0,
  },
})) as Slot["bodyCell"];
StyledTableBodyCell.displayName = "StyledTableBodyCell";

export default StyledTableBodyCell;