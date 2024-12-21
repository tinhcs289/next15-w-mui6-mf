import type { Any, ColumnDef } from "./base.types";

export type TableStates<RowData extends Any = Any> = {
  tableHeight?: number;
  colDefs?: ColumnDef<RowData>[];
  visibleColumns?: string[];
};