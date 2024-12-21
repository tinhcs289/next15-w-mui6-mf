import type { ComponentType, ReactNode } from "react";
import type { TableVirtuosoProps } from "react-virtuoso";
import type { HOC } from "../../types/mui";
import type { Slot, SlotProps } from "./styled-components";

export type Any = { [x: string]: any };

export type ColumnDef<RowData extends Any = Any> = {
  _key: string;
  field?: string;
  head?: ReactNode;
  converter?: (params: { row: RowData; rowIndex: number }) => ReactNode;
  slots?: {
    headCell?: Slot["HeadCell"];
    bodyCell?:
      | Slot["BodyCell"]
      | ComponentType<
          SlotProps["bodyCell"] & {
            rowIndex: number;
            row: RowData;
          }
        >;
  };
  slotProps?: {
    headCell?: Partial<SlotProps["headCell"]>;
    bodyCell?:
      | Partial<SlotProps["bodyCell"]>
      | ((params: {
          row: RowData;
          rowIndex: number;
        }) => Partial<SlotProps["bodyCell"]>);
  };
  visible?: boolean;
  resizable?: boolean;
  stickyFirst?: boolean;
  stickyLast?: boolean;
};

export type BodyRowHOC<RowData extends Any = Any> = HOC<
  SlotProps["bodyRow"] & { row: RowData; rowIndex: number }
>;

export type TableProps<RowData extends Any = Any> = Omit<
  BoxProps,
  "slots" | "slotProps"
> & {
  rows?: RowData[];
  columns?: ColumnDef<RowData>[];
  slots?: {
    container?: Slot["Container"];
    table?: Slot["Table"];
    head?: Slot["Head"];
    headRow?: Slot["HeadRow"];
    body?: Slot["Body"];
    bodyRow?:
      | Slot["BodyRow"]
      | ComponentType<
          SlotProps["bodyRow"] & { row: RowData; rowIndex: number }
        >;
  };
  slotProps?: {
    container?: Partial<SlotProps["container"]>;
    table?: Partial<SlotProps["table"]>;
    head?: Partial<SlotProps["head"]>;
    headRow?: Partial<SlotProps["headRow"]>;
    body?: Partial<SlotProps["body"]>;
    bodyRow?:
      | Partial<SlotProps["bodyRow"]>
      | ((params: {
          row: RowData;
          rowIndex: number;
        }) => Partial<SlotProps["bodyRow"]>);
  };
  rowHocs?: BodyRowHOC<RowData>[];
  virtuosoProps?: Partial<TableVirtuosoProps<RowData, Any>>;
};
