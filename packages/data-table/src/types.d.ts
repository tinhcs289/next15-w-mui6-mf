import type { BoxProps } from "@mui/material/Box";
import type { TableProps } from "@mui/material/Table";
import type { TableBodyProps } from "@mui/material/TableBody";
import type { TableCellProps } from "@mui/material/TableCell";
import type { TableContainerProps } from "@mui/material/TableContainer";
import type { TableHeadProps } from "@mui/material/TableHead";
import type { TableRowProps } from "@mui/material/TableRow";
import type { ComponentType, ReactNode } from "react";
import type { TableVirtuosoProps } from "react-virtuoso";

export type Any = { [x: string]: any };

type CustomSlotParams<RowData extends Any = Any> = {
  row?: RowData;
  rowIndex?: number;
};

export type CustomSlot<RowData extends Any = Any> = {
  bodyRow: ComponentType<TableRowProps & CustomSlotParams<RowData>>;
  bodyCell: ComponentType<TableCellProps & CustomSlotParams<RowData>>;
  bodyCellContent: ComponentType<BoxProps & CustomSlotParams<RowData>>;
};

export type Slot<RowData extends Any = Any> = {
  container: ComponentType<SlotProps<RowData>["container"]>;
  table: ComponentType<SlotProps<RowData>["table"]>;
  head: ComponentType<SlotProps<RowData>["head"]>;
  headRow: ComponentType<SlotProps<RowData>["headRow"]>;
  headCell: ComponentType<SlotProps<RowData>["headCell"]>;
  headCellContent: ComponentType<SlotProps<RowData>["headCellContent"]>;
  headCellLabel: ComponentType<SlotProps<RowData>["headCellLabel"]>;
  body: ComponentType<SlotProps<RowData>["body"]>;
  bodyRow: ComponentType<
    TableRowProps & {
      row?: RowData;
      rowIndex?: number;
    }
  >;
  bodyCell: ComponentType<
    TableCellProps & {
      row?: RowData;
      rowIndex?: number;
    }
  >;
  bodyCellContent: ComponentType<
    BoxProps & { row?: RowData; rowIndex?: number }
  >;
};

export type SlotProps<RowData extends Any = Any> = {
  container: TableContainerProps;
  table: TableProps;
  head: TableHeadProps;
  headRow: TableRowProps;
  headCell: TableCellProps;
  headCellContent: BoxProps;
  headCellLabel: BoxProps;
  body: TableBodyProps;
  bodyRow:
    | Partial<TableRowProps>
    | ((params: { row: RowData; rowIndex: number }) => Partial<TableRowProps>);
  bodyCell:
    | Partial<TableCellProps>
    | ((params: { row: RowData; rowIndex: number }) => Partial<TableCellProps>);
  bodyCellContent:
    | Partial<BoxProps>
    | ((params: { row: RowData; rowIndex: number }) => Partial<BoxProps>);
};

export type ColumnVisibility<RowData extends Any = Any> = Pick<
  ColumnDef<RowData>,
  | "id"
  | "head"
  | "width"
  | "field"
  | "sticky"
  | "defaultSortDirection"
  | "sortable"
> & {
  initialWidth?: number;
  visible?: boolean;
  left?: number;
  right?: number;
};

export type ColumnDef<RowData extends Any = Any> = {
  id?: string;
  head?: ReactNode;
  field?: string;
  converter?: (params: { row: RowData; rowIndex: number }) => ReactNode;
  width?: number;
  slot?: {
    headCell?: Slot<RowData>["headCell"];
    headCellContent?: Slot<RowData>["headCellContent"];
    headCellLabel?: Slot<RowData>["headCellLabel"];
    bodyCell?: Slot<RowData>["bodyCell"];
    bodyCellContent?: Slot<RowData>["bodyCellContent"];
  };
  slotProps?: {
    headCell?: SlotProps<RowData>["headCell"];
    headCellContent?: SlotProps<RowData>["headCellContent"];
    headCellLabel?: SlotProps<RowData>["headCellLabel"];
    bodyCell?: SlotProps<RowData>["bodyCell"];
    bodyCellContent?: SlotProps<RowData>["bodyCellContent"];
  };
  resizable?: boolean;
  sticky?: "start" | "end";
  sortable?: boolean;
  defaultSortDirection?: TableSortOption["direction"];
};

export type TableRowHOC<RowData extends Any = Any> = (
  WrappedComponent: Slot<RowData>["bodyRow"]
) => Slot<RowData>["bodyRow"];

export type TableSortOption = {
  by: string;
  direction: "asc" | "desc";
};

export type DataTableProps<RowData extends Any = Any> = Omit<
  BoxProps,
  "slots" | "slotProps"
> & {
  rowIdentity?: string;
  columns?: ColumnDef<RowData>[];
  columnsReOrder?: boolean;
  onColumnsReOrder?: (columns: ColumnDef<RowData>[]) => void;
  onSelectRows?: (rows: RowData[]) => void;
  onSort?: (options: TableSortOption[]) => void;
  loading?: boolean;
  rows?: RowData[];
  emptyDisplay?: ReactNode;
  loadingDisplay?: ReactNode;
  slots?: {
    container?: Slot<RowData>["container"];
    table?: Slot<RowData>["table"];
    head?: Slot<RowData>["head"];
    headRow?: Slot<RowData>["headRow"];
    body?: Slot<RowData>["body"];
    bodyRow?: Slot<RowData>["bodyRow"];
  };
  slotProps?: {
    container?: SlotProps<RowData>["container"];
    table?: SlotProps<RowData>["table"];
    head?: SlotProps<RowData>["head"];
    headRow?: SlotProps<RowData>["headRow"];
    body?: SlotProps<RowData>["body"];
    bodyRow?: SlotProps<RowData>["bodyRow"];
  };
  virtuosoProps?: Partial<TableVirtuosoProps<RowData, VirtuosoContext>>;
  rowCompositions?: TableRowHOC<RowData>[];
};

export type TableStates<RowData extends Any = Any> = {
  rowIdentity?: string;
  columns?: ColumnDef<RowData>[];
  columnsReOrder?: boolean;
  columnVisibilities?: ColumnVisibility<RowData>[];
  sortOptions?: TableSortOption[];
  loading?: boolean;
  tableHeight?: number;
  tableWidth?: number;
  totalWidthOfFreeSizeColumns?: number;
  averageWidthOfFreeSizeColumn?: number;
  isScrolling?: boolean;
  scrollBlocked?: boolean;
  scrollTop?: number;
  // #region virtuoso-components-init
  slotProps?: DataTableProps<RowData>["slotProps"];
  slots?: DataTableProps<RowData>["slots"];
  rowCompositions?: DataTableProps<RowData>["rowCompositions"];
  emptyDisplay?: DataTableProps<RowData>["emptyDisplay"];
  loadingDisplay?: DataTableProps<RowData>["loadingDisplay"];
  onColumnsReOrder?: DataTableProps<RowData>["onColumnsReOrder"];
  // #endregion
  // #region selections
  rows?: RowData[];
  selectedRows?: RowData[];
  isSelectedAll?: boolean;
  isSelected?: (item: RowData) => boolean;
  checkAllItems?: (checked: boolean) => void;
  checkOrUnCheckItem?: (item: RowData) => void;
  // #endregion
  // #region sort
  onSort?: (options: TableSortOption[]) => void;
  // #endregion
};
