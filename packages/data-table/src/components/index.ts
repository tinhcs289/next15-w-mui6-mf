"use client";

import { alpha, styled } from "@mui/material";
import type { BoxProps } from "@mui/material/Box";
import Box from "@mui/material/Box";
import { checkboxClasses } from "@mui/material/Checkbox";
import type { TableProps } from "@mui/material/Table";
import MuiTable from "@mui/material/Table";
import type { TableBodyProps } from "@mui/material/TableBody";
import MuiTableBody from "@mui/material/TableBody";
import type { TableCellProps } from "@mui/material/TableCell";
import MuiTableCell from "@mui/material/TableCell";
import type { TableContainerProps } from "@mui/material/TableContainer";
import MuiTableContainer from "@mui/material/TableContainer";
import type { TableHeadProps } from "@mui/material/TableHead";
import MuiTableHead from "@mui/material/TableHead";
import type { TableRowProps } from "@mui/material/TableRow";
import MuiTableRow from "@mui/material/TableRow";
import type { Slot } from "../types";

const S = {
  Container: styled(MuiTableContainer)<TableContainerProps>(({ theme }) => ({
    boxSizing: "border-box",
    ...theme.applyStyles("dark", {
      background: "transparent",
      // border: `1px solid ${theme.palette.grey[700]}`,
      boxShadow: theme.shadows[12],
    }),
    ...theme.applyStyles("light", {
      background: theme.palette.grey[100],
      border: `1px solid ${theme.palette.grey[200]}`,
    }),
  })) as Slot["container"],
  Table: styled(MuiTable)<TableProps>(({ theme }) => ({
    tableLayout: "fixed",
    borderCollapse: "collapse",
  })) as Slot["table"],
  Head: styled(MuiTableHead)<TableHeadProps>(({ theme }) => ({
    background:
      theme.palette.mode === "light"
        ? theme.palette.background.paper
        : "transparent",
  })) as Slot["head"],
  HeadRow: styled(MuiTableRow)<TableRowProps>(({ theme }) => ({
    background:
      theme.palette.mode === "light" ? theme.palette.grey[300] : "transparent",
    boxShadow: theme.shadows[1],
    border: "none !important",
  })) as Slot["headRow"],
  HeadCell: styled(MuiTableCell)<TableCellProps>(({ theme }) => ({
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
  })) as Slot["headCell"],
  HeadCellContent: styled(Box)<BoxProps>(({ theme }) => ({
    display: "flex",
    gap: theme.spacing(0.5),
    boxSizing: "border-box",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    height: "100%",
    padding: theme.spacing(0.5),
    margin: "0 !important",
    position: "relative",
  })) as Slot["headCellContent"],
  HeadCellLabel: styled(Box)<BoxProps>(() => ({
    flex: 1,
    boxSizing: "border-box",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  })) as Slot["headCellLabel"],
  Body: styled(MuiTableBody)<TableBodyProps>(({ theme }) => ({
    background:
      theme.palette.mode === "light"
        ? theme.palette.grey[100]
        : alpha(theme.palette.background.paper, 0.5),
  })) as Slot["body"],
  BodyRow: styled(MuiTableRow)<TableRowProps>(({ theme }) => ({
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
  })) as Slot["bodyRow"],
  BodyCell: styled(MuiTableCell)<TableCellProps>(({ theme }) => ({
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
  })) as Slot["bodyCell"],
  BodyCellContent: styled(Box)<BoxProps>(({ theme }) => ({
    display: "flex",
    boxSizing: "border-box",
    width: "100%",
    height: "100%",
    padding: theme.spacing(0.5),
    lineHeight: 1.2,
    fontSize: theme.spacing(1.5),
  })) as Slot["bodyCellContent"],
};

S.Container.displayName = "DataTable:Container";
S.Table.displayName = "DataTable:Table";
S.Head.displayName = "DataTable:Head";
S.HeadRow.displayName = "DataTable:HeadRow";
S.HeadCell.displayName = "DataTable:HeadCell";
S.HeadCellContent.displayName = "DataTable:HeadCellContent";
S.HeadCellLabel.displayName = "DataTable:HeadCellLabel";
S.Body.displayName = "DataTable:Body";
S.BodyRow.displayName = "DataTable:BodyRow";
S.BodyCell.displayName = "DataTable:BodyCell";
S.BodyCellContent.displayName = "DataTable:BodyCellContent";

export default S;
