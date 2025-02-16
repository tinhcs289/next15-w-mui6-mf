import type { Any, ColumnDef } from "../types";
import { defineBaseColumn } from "./column-base";

export const defineNumberColumn = <RowData extends Any = Any>({
  slotProps,
  ...colDef
}: ColumnDef<RowData>) => {
  return defineBaseColumn<RowData>({
    ...colDef,
    slotProps: {
      ...slotProps,
      headCellLabel: {
        ...slotProps?.headCellLabel,
        sx: { textAlign: "right", ...slotProps?.headCellLabel?.sx },
      },
      bodyCellContent: {
        ...(typeof slotProps?.bodyCellContent === "object"
          ? slotProps?.bodyCellContent
          : {}),
        sx: {
          justifyContent: "flex-end",
          ...(typeof slotProps?.bodyCellContent === "object"
            ? slotProps?.bodyCellContent?.sx
            : {}),
        },
      },
    },
  });
};
