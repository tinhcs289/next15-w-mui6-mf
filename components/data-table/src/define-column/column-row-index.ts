import type { Any, ColumnDef } from "../types";
import { defineBaseColumn } from "./column-base";

export const definedRowIndexColumn = <RowData extends Any = Any>({
  slotProps,
  ...coldef
}: Omit<ColumnDef<RowData>, "field" | "converter">) => {
  return defineBaseColumn<RowData>({
    ...coldef,
    field: "@rowIndex",
    converter: ({ rowIndex }) => rowIndex + 1,
    width: 64,
    slotProps: {
      ...slotProps,
      headCellLabel: {
        ...slotProps?.headCellLabel,
        sx: { textAlign: "center", ...slotProps?.headCellLabel?.sx },
      },
      bodyCellContent: {
        ...(typeof slotProps?.bodyCellContent === "object"
          ? slotProps?.bodyCellContent
          : {}),
        sx: {
          justifyContent: "center",
          ...(typeof slotProps?.bodyCellContent === "object"
            ? slotProps?.bodyCellContent?.sx
            : {}),
        },
      },
    },
  });
};
