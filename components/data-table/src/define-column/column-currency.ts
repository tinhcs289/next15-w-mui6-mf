import numeral from "numeral";
import type { Any, ColumnDef } from "../types";
import { defineNumberColumn } from "./column-number";
import get from "lodash/get";

export const defineCurrencyColumn = <RowData extends Any = Any>({
  slotProps,
  getValue,
  ...colDef
}: Omit<ColumnDef<RowData>, "converter"> & {
  getValue?: (params: {
    row: RowData;
    rowIndex: number;
  }) => number | null | undefined;
}) => {
  return defineNumberColumn<RowData>({
    ...colDef,
    converter: ({ row, rowIndex }) => {
      const field = colDef?.field;
      if (typeof field === "string") {
        const value1 = get(row, field);
        if (typeof value1 === "number") {
          return numeral(value1).format("0,0[.]00$");
        }
      }

      if (typeof getValue !== "function") {
        return null;
      }

      const value2 = getValue({ row, rowIndex });
      if (typeof value2 !== "number") {
        return null;
      }

      return numeral(value2).format("0,0[.]00$");
    },
  });
};
