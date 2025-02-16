import get from "lodash/get";
import type { Any, ColumnDef } from "../types";
import { defineNumberColumn } from "./column-number";

function toAbbreviatedString({
  value,
  units = ["K", "M", "B", "T"],
  toFix = 0,
}: {
  value: number;
  units?: [
    thousand: string,
    million: string,
    billion: string,
    trillion: string,
  ];
  toFix?: Parameters<Number["toFixed"]>[0];
}) {
  const tranform = (n: number) => {
    if (n < 1e3) return `${n}`;
    if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(toFix) + units[0];
    if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(toFix) + units[1];
    if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(toFix) + units[2];
    if (n >= 1e12) return +(n / 1e12).toFixed(toFix) + units[3];
    return `${n}`;
  };

  if (value >= 0) return tranform(value);
  return `-${tranform(-1 * value)}`;
}

export const defineNumberCountColumn = <RowData extends Any = Any>({
  slotProps,
  getValue,
  units = ["K", "M", "B", "T"],
  ...colDef
}: Omit<ColumnDef<RowData>, "converter"> & {
  getValue?: (params: {
    row: RowData;
    rowIndex: number;
  }) => number | null | undefined;
  units?: [
    thousand: string,
    million: string,
    billion: string,
    trillion: string,
  ];
}) => {
  return defineNumberColumn<RowData>({
    ...colDef,
    converter: ({ row, rowIndex }) => {
      const field = colDef?.field;
      if (typeof field === "string") {
        const value1 = get(row, field);
        if (typeof value1 === "number") {
          return toAbbreviatedString({
            value: value1,
            units,
            toFix: 1,
          });
        }
      }

      if (typeof getValue !== "function") {
        return null;
      }

      const value2 = getValue({ row, rowIndex });
      if (typeof value2 !== "number") {
        return null;
      }

      return toAbbreviatedString({
        value: value2,
        units,
        toFix: 1,
      });
    },
  });
};
