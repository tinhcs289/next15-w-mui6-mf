"use client";

import Paper from "@mui/material/Paper";
import { forwardRef } from "react";
import type { TableComponents } from "react-virtuoso";
import type { Any, TableProps } from "./base.types";
import S from "./styled-components";

export function createVirtuosoComponents<RowData extends Any = Any>({
  slots = {},
  slotProps = {},
}: {
  slots?: TableProps<RowData>["slots"];
  slotProps?: TableProps<RowData>["slotProps"];
}) {
  const {
    container: Container = S.Container,
    table: Table = S.Table,
    head: Head = S.Head,
    body: Body = S.Body,
    bodyRow: BodyRow = S.BodyRow,
  } = slots;

  const {
    container: containerProps,
    container: tableProps,
    head: headProps,
    body: bodyProps,
    bodyRow: bodyRowProps,
  } = slotProps;

  const components: TableComponents<RowData, Any> = {
    Scroller: forwardRef<HTMLDivElement>((props, ref) => (
      <Container component={Paper} {...props} ref={ref} {...containerProps} />
    )),
    Table: forwardRef((props, ref) => (
      <Table
        {...props}
        {...tableProps}
        sx={{
          borderCollapse: "separate",
          tableLayout: "fixed",
          ...tableProps?.sx,
        }}
        ref={ref as any}
      />
    )),
    TableHead: forwardRef((props, ref) => (
      <Head {...props} ref={ref as any} {...headProps} />
    )),
    TableRow: forwardRef(({ item, ...props }, ref) => {
      let customProps = {};
      if (typeof bodyRowProps === "object") customProps = bodyRowProps;
      if (typeof bodyRowProps === "function")
        customProps = bodyRowProps({
          row: item,
          rowIndex: +props["data-index"],
        });
      // @ts-ignore
      return <BodyRow ref={ref as any} {...customProps} {...props} />;
    }),
    TableBody: forwardRef<HTMLTableSectionElement>((props, ref) => (
      <Body {...props} ref={ref} {...bodyProps} />
    )),
  };
  return components;
}
