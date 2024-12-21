"use client";

import get from "lodash/get";
import type { ReactNode } from "react";
import type { Any } from "./base.types";
import { useGetState } from "./context";
import S from "./styled-components";

function RowCells<RowData extends Any = Any>({
  rowIndex,
  row,
}: {
  rowIndex: number;
  row: RowData;
}) {
  const colDefs = useGetState((s) => s?.colDefs);
  return !colDefs?.length ? null : (
    <>
      {colDefs.map(
        ({ _key, field, slots = {}, slotProps = {}, converter }, i) => {
          let inner = "" as ReactNode;
          if (typeof converter === "function") {
            inner = converter({ row, rowIndex });
          }
          if (typeof field !== "string" || !field.trim()) {
            inner = null;
          }

          inner = get(row, field as string, null);

          const Cell = slots.bodyCell || S.BodyCell;
          const isNativeCell = !slots?.bodyCell;

          const cellProps =
            typeof slotProps.bodyCell === "function"
              ? slotProps.bodyCell({ row, rowIndex })
              : slotProps.bodyCell || {};

          return (
            <Cell
              key={_key}
              {...((!isNativeCell
                ? {
                    row,
                    rowIndex,
                  }
                : {}) as any)}
              {...cellProps}
            >
              {inner}
            </Cell>
          );
        }
      )}
    </>
  );
}

export function itemContent<RowData extends Any = Any>(
  rowIndex: number,
  row: RowData
) {
  return <RowCells rowIndex={rowIndex} row={row} />;
}
