"use client";

import { styled } from "@mui/material";
import type { TableRowProps } from "@mui/material/TableRow";
import MuiTableRow from "@mui/material/TableRow";
import type { Slot } from "../types";

const StyledTableBodyRow = styled(MuiTableRow)<TableRowProps>(({ theme }) => ({
  position: "relative",

  "&::after": {
    content: "''",
    display: "block",
    position: "absolute",
    userSelect: "none",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    right: 0,
    width: "calc(100% + 4px)",
    height: "calc(100% + 4px)",
    background: "transparent",
    border: `solid 2px ${theme.palette.primary.main}`,
    boxShadow: theme.shadows[2],
    transition: "all ease .5s",
    opacity: 0,
  },
  ["&:hover"]: {
    "&::after": {
      opacity: 1,
    },
  },
})) as Slot["bodyRow"];
StyledTableBodyRow.displayName = "StyledTableBodyRow";

export default StyledTableBodyRow;