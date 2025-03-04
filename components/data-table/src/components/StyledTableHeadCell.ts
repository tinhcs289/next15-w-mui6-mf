"use client";

import { styled } from "@mui/material";
import { checkboxClasses } from "@mui/material/Checkbox";
import type { TableCellProps } from "@mui/material/TableCell";
import MuiTableCell from "@mui/material/TableCell";
import type { Slot } from "../types";

const StyledTableHeadCell = styled(MuiTableCell)<TableCellProps>(({ theme }) => ({
  userSelect: "none",
  padding: "0 !important",
  background:
    theme.palette.mode === "light"
      ? theme.palette.background.paper
      : "hsl(217.89deg 24.68% 15.1%) !important",
  fontWeight: 600,
  width: "fit-content",
  height: "fit-content",
  blockSize: "fit-content",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  border: "none !important",
  ["&:not(:last-child) > div.head-content"]: {
    position: "relative",
    ["&::after"]: {
      position: "absolute",
      content: "''",
      display: "block",
      userSelect: "none",
      top: "50%",
      transform: "translateY(-50%)",
      right: -1,
      width: theme.spacing(0.25),
      height: "60%",
      opacity: 0.8,
      background: theme.palette.grey[400],
    },
  },
  ["&:not(.resizable)"]: {
    ["&::after"]: {
      opacity: 0,
    },
  },
  [`.${checkboxClasses.root}`]: {
    margin: 0,
  },
})) as Slot["headCell"];
StyledTableHeadCell.displayName = "StyledTableHeadCell";

export default StyledTableHeadCell;