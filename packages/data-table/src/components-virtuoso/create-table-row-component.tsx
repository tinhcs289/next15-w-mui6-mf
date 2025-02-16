"use client";

import get from "lodash/get";
import { Fragment, useMemo, type ReactNode } from "react";
import S from "../components";
import { useGetColumnVisibility, useGetState } from "../context";
import type { Any, ColumnDef, SlotProps } from "../types";

function RenderCell<RowData extends Any = Any>({
  id,
  field,
  converter,
  slot,
  slotProps,
  rowIndex,
  rowData,
}: ColumnDef<RowData> & { rowIndex: number; rowData: RowData }) {
  const Cell = slot?.bodyCell || S.BodyCell;
  const CellContent = slot?.bodyCellContent || S.BodyCellContent;

  const isNativeCell = useMemo(() => !slot?.bodyCell, [slot?.bodyCell]);
  const isNativeCellContent = useMemo(
    () => !slot?.bodyCellContent,
    [slot?.bodyCellContent]
  );

  const { visible } = useGetColumnVisibility(id);
  if (!visible) return <Fragment key={id || field} />;

  const cellProps: Partial<SlotProps["bodyCell"]> = useMemo(() => {
    let p = {} as Partial<SlotProps["bodyCell"]>;
    if (typeof slotProps?.bodyCell === "object") {
      p = { ...slotProps.bodyCell };
    }
    if (typeof slotProps?.bodyCell === "function") {
      p = slotProps.bodyCell({ row: rowData, rowIndex });
    }
    if (!isNativeCell) {
      // @ts-ignore
      p["row"] = rowData;
      // @ts-ignore
      p["rowIndex"] = rowIndex;
    }
    return p;
  }, [rowData, rowIndex, slotProps?.bodyCell, isNativeCell]);

  const $Inner = useMemo(() => {
    let inner = "" as ReactNode;
    if (typeof converter === "function") {
      inner = converter({ row: rowData, rowIndex });
    }
    if (!inner) {
      if (!field?.trim?.()) {
        inner = null;
      } else {
        inner = get(rowData, field as string, null);
      }
    }
    return inner;
  }, [field, rowData, rowIndex, converter]);

  const cellContentProps: Partial<SlotProps["bodyCellContent"]> =
    useMemo(() => {
      let p = {} as Partial<SlotProps["bodyCellContent"]>;
      if (typeof slotProps?.bodyCellContent === "object") {
        p = slotProps.bodyCellContent;
      }
      if (typeof slotProps?.bodyCellContent === "function") {
        p = slotProps.bodyCellContent({ row: rowData, rowIndex });
      }
      if (!isNativeCellContent) {
        // @ts-ignore
        p["row"] = rowData;
        // @ts-ignore
        p["rowIndex"] = rowIndex;
      }
      return p;
    }, [rowData, rowIndex, slotProps?.bodyCellContent, isNativeCellContent]);

  return (
    // @ts-ignore
    <Cell key={id || field} {...cellProps}>
      {/* @ts-ignore */}
      <CellContent {...cellContentProps}>{$Inner}</CellContent>
    </Cell>
  );
}

function RowContent<RowData extends Any = Any, ContextData extends Any = Any>({
  index,
  data,
  context: _,
}: {
  index: number;
  data: RowData;
  context: ContextData;
}) {
  const colDefs = useGetState((s) => s?.columns);
  return (
    <>
      {!colDefs?.length
        ? null
        : colDefs.map((col) => (
            <RenderCell
              key={col.id || col.field}
              {...col}
              rowData={data}
              rowIndex={index}
            />
          ))}
    </>
  );
}

export function createRowContent<
  RowData extends Any = Any,
  ContextData extends Any = Any,
>(index: number, row: RowData, context: ContextData) {
  return <RowContent index={index} data={row} context={context} />;
}
