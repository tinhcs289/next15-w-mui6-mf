"use client";

import type { SxProps, Theme } from "@mui/material";
import get from "lodash/get";
import { ComponentType, forwardRef, useMemo } from "react";
import { TableVirtuosoProps } from "react-virtuoso";
import S from "../components";
import LoadingIndicator from "../components/LoadingIndicator";
import { useGetState } from "../context";
import type { Any, SlotProps } from "../types";

function combineHOCs<Props>(
  ...hocs: Array<(comp: ComponentType<Props>) => ComponentType<Props>>
) {
  return hocs.reverse().reduceRight((h, g) => (p) => h(g(p)));
}

type VirtuosoComponents<
  RowData extends Any = Any,
  ContextData extends Any = Any,
> = Required<TableVirtuosoProps<RowData, ContextData>>["components"];

export function createVirtuosoComponents<
  RowData extends Any = Any,
  ContextData extends Any = Any,
>(): VirtuosoComponents<RowData, ContextData> {
  const components: VirtuosoComponents<RowData, ContextData> = {
    Scroller: forwardRef<HTMLDivElement, SlotProps<RowData>["container"]>(
      ({ children, ...props }, ref) => {
        const height = useGetState((s) => s?.tableHeight || 0);
        const containerProps = useGetState((s) => s?.slotProps?.container);
        const Slot = useGetState((s) => s?.slots?.container);
        const Component = Slot || S.Container;
        return (
          <Component
            {...props}
            {...containerProps}
            sx={
              {
                ...props?.sx,
                ...containerProps?.sx,
                height: `${height}px`,
                position: "relative",
              } as SxProps<Theme>
            }
            ref={ref}
          >
            <LoadingIndicator />
            {children}
          </Component>
        );
      }
    ),
    Table: forwardRef<HTMLTableElement, SlotProps<RowData>["table"]>(
      ({ children, ...props }, ref) => {
        const height = useGetState((s) => s?.tableHeight || 0);
        const tableProps = useGetState((s) => s?.slotProps?.table);
        const Slot = useGetState((s) => s?.slots?.table);
        const Component = Slot || S.Table;
        return (
          <Component
            size="small"
            padding="none"
            {...props}
            {...tableProps}
            sx={
              {
                ...props?.sx,
                ...tableProps?.sx,
                height: `${height}px`,
              } as SxProps<Theme>
            }
            ref={ref}
          >
            {children}
          </Component>
        );
      }
    ),
    TableHead: forwardRef<HTMLTableSectionElement, SlotProps<RowData>["head"]>(
      ({ children, ...props }, ref) => {
        const headProps = useGetState((s) => s?.slotProps?.head);
        const Slot = useGetState((s) => s?.slots?.head);
        const Component = Slot || S.Head;
        return (
          <Component
            {...props}
            {...headProps}
            sx={
              {
                ...props?.sx,
                ...headProps?.sx,
              } as SxProps<Theme>
            }
            ref={ref}
          >
            {children}
          </Component>
        );
      }
    ),
    TableRow: forwardRef(({ children, item, ...props }, ref) => {
      const data = item;
      const rowIndex = +props["data-index"];
      const idField = useGetState((s) => s?.rowIdentity);
      const $key = useMemo(
        () => (!idField ? rowIndex : get(data, idField, rowIndex)),
        [idField, rowIndex]
      );

      const rowProps = useGetState((s) => s?.slotProps?.bodyRow);
      const Slot = useGetState((s) => s?.slots?.bodyRow);
      const rowCompositions = useGetState((s) => s?.rowCompositions);
      let Component = Slot || S.BodyRow;
      const isNativeRow = !Slot;
      if (!!rowCompositions?.length) {
        // @ts-ignore
        Component = combineHOCs(...rowCompositions)(Component);
      }

      let customProps = {};
      if (typeof rowProps === "object") customProps = rowProps;
      if (typeof rowProps === "function")
        customProps = rowProps({ row: data, rowIndex });

      if (!isNativeRow) {
        // @ts-ignore
        customProps["row"] = data;
        // @ts-ignore
        customProps["rowIndex"] = rowIndex;
      }

      return (
        // @ts-ignore
        <Component
          key={$key}
          {...props}
          {...customProps}
          // @ts-ignore
          sx={{ ...props?.sx, ...customProps?.sx }}
          ref={ref as any}
        >
          {children}
        </Component>
      );
    }),
    TableBody: forwardRef<HTMLTableSectionElement, SlotProps<RowData>["body"]>(
      ({ children, ...props }, ref) => {
        const bodyProps = useGetState((s) => s?.slotProps?.body);
        const Slot = useGetState((s) => s?.slots?.body);
        const Component = Slot || S.Body;
        return (
          <Component
            {...props}
            {...bodyProps}
            sx={
              {
                ...props?.sx,
                ...bodyProps?.sx,
              } as SxProps<Theme>
            }
            ref={ref}
          >
            {children}
          </Component>
        );
      }
    ),
    EmptyPlaceholder: forwardRef<
      HTMLTableSectionElement,
      SlotProps<RowData>["body"]
    >(({ children, ...props }, ref) => {
      const Slot = useGetState((s) => s?.slots?.body);
      const Component = Slot || S.Body;

      const colSpan = useGetState((s) => s?.columns?.length);
      const bodyProps = useGetState((s) => s?.slotProps?.body);
      const emptyDisplay = useGetState((s) => s?.emptyDisplay);
      const loading = useGetState((s) => !!s?.loading);

      const $display = useMemo(
        () => (!loading ? emptyDisplay : ""),
        [loading, emptyDisplay]
      );

      return (
        <Component {...props} {...bodyProps} ref={ref as any}>
          <S.BodyRow>
            <S.BodyCell align="center" colSpan={colSpan}>
              <S.BodyCellContent
                sx={{
                  margin: "0 auto",
                  width: "100%",
                  height: "100%",
                  padding: "4rem",
                  display: "flex",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                {$display || children}
              </S.BodyCellContent>
            </S.BodyCell>
          </S.BodyRow>
        </Component>
      );
    }) as any,
  };

  // @ts-ignore
  components.Table.displayName = "Virtuoso:Table";
  // @ts-ignore
  components.TableHead.displayName = "Virtuoso:TableHead";
  // @ts-ignore
  components.TableBody.displayName = "Virtuoso:TableBody";
  // @ts-ignore
  components.TableRow.displayName = "Virtuoso:TableBodyRow";

  return components;
}
