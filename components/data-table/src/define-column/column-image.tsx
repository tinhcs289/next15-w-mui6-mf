import BoxImage from "../components/BoxImage";
import type { Any, ColumnDef } from "../types";
import { defineBaseColumn } from "./column-base";

export const defineImageColumn = <RowData extends Any = Any>({
  slotProps,
  getSrc,
  getAlt,
  imageWidth = 32,
  imageHeight = 32,
  ...colDef
}: Omit<ColumnDef<RowData>, "converter"> & {
  getSrc: (params: { row: RowData }) => string;
  getAlt?: (params: { row: RowData }) => string;
  imageWidth?: number;
  imageHeight?: number;
}) => {
  return defineBaseColumn<RowData>({
    ...colDef,
    width: 100,
    converter: ({ row }) => {
      const src = getSrc({ row });
      if (!src) return null;
      const alt = getAlt?.({ row }) || "";
      return (
        <BoxImage
          imageProps={{
            src,
            alt,
          }}
          width={imageWidth}
          height={imageHeight}
        />
      );
    },
    slotProps: {
      ...slotProps,
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
