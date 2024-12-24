"use client";

import { styled } from "@mui/material";
import type { TableProps } from "@mui/material/Table";
import MuiTable from "@mui/material/Table";
import type { TableBodyProps } from "@mui/material/TableBody";
import MuiTableBody from "@mui/material/TableBody";
import type { TableCellProps } from "@mui/material/TableCell";
import MuiTableCell, { tableCellClasses } from "@mui/material/TableCell";
import type { TableContainerProps } from "@mui/material/TableContainer";
import MuiTableContainer from "@mui/material/TableContainer";
import type { TableHeadProps } from "@mui/material/TableHead";
import MuiTableHead from "@mui/material/TableHead";
import type { TableRowProps } from "@mui/material/TableRow";
import MuiTableRow from "@mui/material/TableRow";
import type { ComponentType } from "react";

const S = {
  Container: styled(MuiTableContainer)<TableContainerProps>({}),
  Table: styled(MuiTable)<TableProps>({}),
  Head: styled(MuiTableHead)<TableHeadProps>(({ theme }) => ({
    background: theme.palette.background.paper,
    [`.${tableCellClasses.root}`]: {
      // fontWeight: 700,
      // color: theme.palette.grey[900],
      // textTransform: "uppercase",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      ":not(:last-child)": {
        position: "relative",
        ":after": {
          content: '""',
          display: "block",
          position: "absolute",
          top: "50%",
          transform: "translateY(-50%)",
          right: 0,
          width: "1px",
          height: "80%",
          background: theme.palette.grey[400],
        },
      },
    },
  })),
  HeadRow: styled(MuiTableRow)<TableRowProps>({}),
  HeadCell: styled(MuiTableCell)<TableCellProps>({}),
  Body: styled(MuiTableBody)<TableBodyProps>({}),
  BodyRow: styled(MuiTableRow)<TableRowProps>({}),
  BodyCell: styled(MuiTableCell)<TableCellProps>({}),
  EmptyRow: styled(MuiTableRow)<TableRowProps>({}),
  EmptyCell: styled(MuiTableCell)<TableCellProps>({}),
};

S.Container.displayName = "StyledTableContainer";
S.Table.displayName = "StyledTable";
S.Head.displayName = "StyledTableContainer";
S.HeadRow.displayName = "StyledTableHeadRow";
S.HeadCell.displayName = "StyledTableHeadCell";
S.Body.displayName = "StyledTableBody";
S.BodyRow.displayName = "StyledTableBodyRow";
S.BodyCell.displayName = "StyledTableBodyCell";
S.EmptyRow.displayName = "StyledTableBodyEmptyRow";
S.EmptyCell.displayName = "StyledTableBodyEmptyCell";

export default S;

export type Slot = {
  Container: typeof S.Container | ComponentType<TableContainerProps>;
  Table: typeof S.Table | ComponentType<TableProps>;
  Head: typeof S.Head | ComponentType<TableHeadProps>;
  HeadRow: typeof S.HeadRow | ComponentType<TableRowProps>;
  HeadCell: typeof S.HeadCell | ComponentType<TableCellProps>;
  Body: typeof S.Body | ComponentType<TableBodyProps>;
  BodyRow: typeof S.BodyRow | ComponentType<TableRowProps>;
  BodyCell: typeof S.BodyCell | ComponentType<TableCellProps>;
  EmptyRow: typeof S.EmptyRow | ComponentType<TableRowProps>;
  EmptyCell: typeof S.EmptyCell | ComponentType<TableCellProps>;
};

export type SlotProps = {
  container: TableContainerProps;
  table: TableProps;
  head: TableHeadProps;
  headRow: TableRowProps;
  headCell: TableCellProps;
  body: TableBodyProps;
  bodyRow: TableRowProps;
  bodyCell: TableCellProps;
  emptyRow: TableRowProps;
  emptyCell: TableCellProps;
}