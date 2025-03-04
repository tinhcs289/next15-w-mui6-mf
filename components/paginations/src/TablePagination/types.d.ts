import type { TablePaginationProps as MuiTablePaginationProps } from "@mui/material/TablePagination";

export type TablePaginationProps = Omit<
  MuiTablePaginationProps,
  | "onChange"
  | "onPageChange"
  | "onRowsPerPageChange"
  | "count"
  | "size"
  | "page"
  | "rowsPerPage"
> & {
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  onChange?: (page: number, size: number) => void;
  loading?: boolean;
};