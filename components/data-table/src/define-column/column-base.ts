import type { Any, ColumnDef } from "../types";

function createRandomGUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

type WidthProps = string | number | undefined;

export function defineBaseColumn<RowData extends Any = Any>({
  slotProps,
  width,
  ...colDef
}: Omit<ColumnDef<RowData>, "id">) {
  const columnWitdh =
    slotProps?.headCell?.width ||
    slotProps?.headCell?.style?.width ||
    // @ts-ignore
    (slotProps?.headCell?.sx?.width as WidthProps) ||
    slotProps?.headCellContent?.style?.width;

  const contentWidth =
    typeof width === "number"
      ? `${width}px`
      : slotProps?.headCell?.style?.width ||
        slotProps?.headCellContent?.style?.width;

  return {
    ...colDef,
    width,
    resizable: true,
    slotProps: {
      ...slotProps,
      headCell: {
        ...slotProps?.headCell,
        width,
        sx: {
          ...slotProps?.headCell?.sx,
          ...(!columnWitdh
            ? {}
            : {
                width: columnWitdh,
                minWidth: columnWitdh,
                maxWidth: columnWitdh,
                wordBreak: "break-all",
              }),
        },
      },
      headCellContent: {
        ...slotProps?.headCellContent,
        sx: {
          ...slotProps?.headCellContent?.sx,
          ...(!contentWidth
            ? {}
            : {
                width: contentWidth,
                minWidth: contentWidth,
                maxWidth: contentWidth,
              }),
        },
      },
    },
    id: createRandomGUID(),
  } as ColumnDef<RowData>;
}
