"use client";

import { SxProps, Theme } from "@mui/material";
import Paper from "@mui/material/Paper";
import { forwardRef, ReactNode, useMemo } from "react";
import type { TableComponents } from "react-virtuoso";
import type { Any, TableProps } from "./base.types";
import { useGetState } from "./context";
import type { SlotProps } from "./base.components";
import S from "./base.components";

export function createVirtuosoComponents<RowData extends Any = Any>({
  slots = {},
  slotProps = {},
  emptyDisplay,
}: {
  slots?: TableProps<RowData>["slots"];
  slotProps?: TableProps<RowData>["slotProps"];
  emptyDisplay?: ReactNode;
}) {
  const {
    container: Container = S.Container,
    table: Table = S.Table,
    head: Head = S.Head,
    body: Body = S.Body,
    bodyRow: BodyRow = S.BodyRow,
    emptyRow: EmptyRow = S.EmptyRow,
    emptyCell: EmptyCell = S.EmptyCell,
  } = slots;

  const {
    container: containerProps,
    container: tableProps,
    head: headProps,
    body: bodyProps,
    bodyRow: bodyRowProps,
    emptyRow: emptyRowProps,
    emptyCell: emptyCellProps,
  } = slotProps;

  const components: TableComponents<RowData, Any> = {
    Scroller: forwardRef<HTMLDivElement, SlotProps["container"]>(
      ({ children, ...props }, ref) => {
        const sx: Partial<SxProps<Theme>> = useMemo(
          () => ({
            ...props?.sx,
            ...containerProps?.sx,
          }),
          [props?.sx, containerProps?.sx]
        );

        return (
          <Container
            component={Paper}
            {...props}
            {...containerProps}
            sx={sx as SxProps<Theme>}
            ref={ref}
          >
            {children}
          </Container>
        );
      }
    ),
    Table: forwardRef<HTMLTableElement, SlotProps["table"]>(
      ({ children, ...props }, ref) => {
        const sx: Partial<SxProps<Theme>> = useMemo(
          () => ({
            ...props?.sx,
            borderCollapse: "separate",
            tableLayout: "fixed",
            ...tableProps?.sx,
          }),
          [props?.sx, tableProps?.sx]
        );

        return (
          <Table {...props} {...tableProps} sx={sx as SxProps<Theme>} ref={ref}>
            {children}
          </Table>
        );
      }
    ),
    TableHead: forwardRef<HTMLTableSectionElement, SlotProps["head"]>(
      ({ children, ...props }, ref) => {
        const sx: Partial<SxProps<Theme>> = useMemo(
          () => ({
            ...props?.sx,
            ...tableProps?.sx,
          }),
          [props?.sx, headProps?.sx]
        );

        return (
          <Head
            {...props}
            {...headProps}
            sx={sx as SxProps<Theme>}
            ref={ref as any}
          >
            {children}
          </Head>
        );
      }
    ),
    TableRow: forwardRef(({ item, ...props }, ref) => {
      let customProps = {};
      if (typeof bodyRowProps === "object") customProps = bodyRowProps;
      if (typeof bodyRowProps === "function")
        customProps = bodyRowProps({
          row: item,
          rowIndex: +props["data-index"],
        });
      // @ts-ignore
      return <BodyRow {...customProps} {...props} ref={ref as any} />;
    }),
    TableBody: forwardRef<HTMLTableSectionElement, SlotProps["body"]>(
      ({ children, ...props }, ref) => {
        const tableHeight = useGetState((s) => s?.tableHeight);

        const sx: Partial<SxProps<Theme>> = useMemo(
          () => ({
            ...props?.sx,
            ...bodyProps?.sx,
            height: `${tableHeight}px`,
          }),
          [props?.sx, bodyProps?.sx, tableHeight]
        );

        return (
          <Body {...props} {...bodyProps} sx={sx as SxProps<Theme>} ref={ref}>
            {children}
          </Body>
        );
      }
    ),
    EmptyPlaceholder: forwardRef<HTMLTableRowElement, SlotProps["emptyRow"]>(
      ({ children, ...props }, ref) => {
        const colSpan = useGetState((s) => s?.colDefs?.length);

        const sx: Partial<SxProps<Theme>> = useMemo(
          () => ({
            ...props?.sx,
            ...emptyRowProps?.sx,
          }),
          [props?.sx, emptyRowProps?.sx]
        );

        return (
          <Body {...bodyProps}>
            <EmptyRow
              {...props}
              {...emptyRowProps}
              sx={sx as SxProps<Theme>}
              ref={ref as any}
            >
              <EmptyCell
                align="center"
                {...(emptyCellProps as any)}
                colSpan={colSpan}
              >
                {emptyDisplay || children}
              </EmptyCell>
            </EmptyRow>
          </Body>
        );
      }
    ) as any,
  };
  return components;
}
