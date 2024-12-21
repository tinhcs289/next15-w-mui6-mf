"use client";

import { styled } from "@mui/material";
import type { TablePaginationProps as MuiTablePaginationProps } from "@mui/material/TablePagination";
import MuiTablePagination from "@mui/material/TablePagination";
import upperFirst from "lodash/upperFirst";
import type { ChangeEvent } from "react";
import { useCallback, useMemo } from "react";

type TablePaginationProps = Omit<
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

const intOrDefault = (value: any, defaultValue: number = -1) => {
  if (typeof value === "string" && value.trim().match(/^[0-9]+$/)) {
    return +value;
  }

  return typeof value === "number" && !Number.isNaN(value)
    ? Number(value)
    : defaultValue;
};

const TablePaginationStyled = styled(
  MuiTablePagination
)<MuiTablePaginationProps>(() => ({
  display: "flex",
  justifyContent: "center",
}));

function TablePagination(props: TablePaginationProps) {
  const {
    pageIndex: pi,
    pageSize: ps,
    totalCount,
    onChange,
    labelDisplayedRows: ldr,
    getItemAriaLabel: gial,
    labelRowsPerPage: lrpp,
    rowsPerPageOptions = [20, 50, 100, 200],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    loading,
    ...otherProps
  } = props;
  const pageIndex = useMemo(
    () => (Number.isInteger(pi) && pi > 0 ? pi - 1 : 0),
    [pi]
  );
  const pageSize = useMemo(
    () => (Number.isInteger(ps) ? Number(ps) : 10),
    [ps]
  );
  const labelRowsPerPage = useMemo(() => lrpp || "rows per page", [lrpp]);

  const handleChange = useCallback(
    (field?: "pageIndex" | "pageSize") => {
      return (event: ChangeEvent<unknown>, page: number) => {
        event?.stopPropagation?.();
        event?.preventDefault?.();
        if (!field) return;
        switch (field) {
          case "pageIndex":
            onChange?.(page + 1, pageSize);
            break;
          case "pageSize":
            // eslint-disable-next-line no-case-declarations
            const size = intOrDefault((event?.target as any)?.value, pageSize);
            onChange?.(1, size);
            break;
          default:
            return;
        }
      };
    },
    [onChange, pageSize]
  );
  const labelDisplayedRows = useCallback(
    (args: { from: number; to: number; count: number; page: number }) => {
      return typeof ldr === "function"
        ? ldr(args as any)
        : `${args?.from || "?"} to ${args?.to || "?"} of ${args?.count || "?"}`;
    },
    [ldr]
  );
  const getItemAriaLabel = useCallback(
    (type: "first" | "last" | "next" | "previous") => {
      return typeof gial === "function"
        ? gial(type)
        : `go to ${upperFirst(type)} page`;
    },
    [gial]
  );
  return (
    <TablePaginationStyled
      //@ts-ignore
      size="small"
      component="div"
      rowsPerPageOptions={rowsPerPageOptions}
      showFirstButton
      showLastButton
      {...otherProps}
      onPageChange={handleChange("pageIndex") as any}
      onRowsPerPageChange={handleChange("pageSize") as any}
      count={totalCount || 0}
      page={pageIndex}
      rowsPerPage={pageSize}
      getItemAriaLabel={getItemAriaLabel}
      labelRowsPerPage={labelRowsPerPage}
      labelDisplayedRows={labelDisplayedRows}
    />
  );
}

export { TablePagination };
export type { TablePaginationProps };
