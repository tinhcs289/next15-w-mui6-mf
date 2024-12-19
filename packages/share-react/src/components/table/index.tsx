"use client";

import { styled } from "@mui/material";
import type { BoxProps } from "@mui/material/Box";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import type { TableProps } from "@mui/material/Table";
import MuiTable from "@mui/material/Table";
import type { TableBodyProps } from "@mui/material/TableBody";
import MuiTableBody from "@mui/material/TableBody";
import TableCell, {
  tableCellClasses,
  TableCellProps,
} from "@mui/material/TableCell";
import type { TableContainerProps } from "@mui/material/TableContainer";
import TableContainer from "@mui/material/TableContainer";
import type { TableHeadProps } from "@mui/material/TableHead";
import MuiTableHead from "@mui/material/TableHead";
import type { TableRowProps } from "@mui/material/TableRow";
import MuiTableRow from "@mui/material/TableRow";
import type { AnyObject } from "@repo/types/common";
import { GUID } from "@repo/utils/string/guid";
import get from "lodash/get";
import type { ComponentType, ForwardedRef, JSX, Ref } from "react";
import { forwardRef, memo } from "react";
import type { TableComponents } from "react-virtuoso";
import { TableVirtuoso } from "react-virtuoso";
import {
  createStatesContext,
  UseGetState,
  UseInitState,
  UseSetState,
} from "../../utils/states-context";

const TableContainerStyled = styled(TableContainer)<TableContainerProps>({});
const TableStyled = styled(MuiTable)<TableProps>({});
const TableHeadStyled = styled(MuiTableHead)<TableHeadProps>(({ theme }) => ({
  background: theme.palette.background.paper,
  [`.${tableCellClasses.root}`]: {
    fontWeight: 700,
    color: theme.palette.grey[900],
    textTransform: "uppercase",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    ":not(:last-child)": {
      position: "relative",
      ":after": {
        content: '""',
        display: "block",
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        right: 0,
        width: "1px",
        height: "80%",
        background: theme.palette.grey[400],
      },
    },
  },
}));
const TableRowStyled = styled(MuiTableRow)<TableRowProps>({});
const TableBodyStyled = styled(MuiTableBody)<TableBodyProps>({});
const TableCellStyled = styled(TableCell)<TableCellProps>({});

type TableComponent = typeof MuiTable | typeof TableStyled;

type TableHeadComponent = typeof MuiTableHead | typeof TableHeadStyled;

type TableBodyComponent = typeof MuiTableBody | typeof TableBodyStyled;

type TableCellComponent =
  | ComponentType<TableCellProps>
  | typeof TableCellStyled;

type CustomTableCellComponent<RowData extends AnyObject = AnyObject> =
  ComponentType<
    TableCellProps & {
      columnIndex: number;
      rowIndex: number;
      row: RowData;
      field?: string;
      _key?: string;
    }
  >;

type TableRowComponent = typeof MuiTableRow | typeof TableRowStyled;

type TableContainerComponent =
  | typeof TableContainer
  | typeof TableContainerStyled;

type DefineHeadCellProps = (params: {
  columnIndex: number;
  field?: string;
  _key?: string;
}) => Partial<TableCellProps>;

type DefineBodyCellProps<RowData extends AnyObject = AnyObject> = (params: {
  columnIndex: number;
  rowIndex: number;
  row: RowData;
  field?: string;
  _key?: string;
}) => Partial<TableCellProps>;

type DefineBodyRowProps<RowData extends AnyObject = AnyObject> = (params: {
  rowIndex: number;
  row: RowData;
}) => Partial<TableRowProps>;

type ColumnDef<RowData extends AnyObject = AnyObject> = {
  _key: string;
  head?: string;
  field?: string;
  slots?: {
    Head?: TableCellComponent | ComponentType<any>;
    Cell?: CustomTableCellComponent<RowData> | ComponentType<any>;
  };
  slotProps?: {
    head?: Partial<TableCellProps> | DefineHeadCellProps;
    cell?: Partial<TableCellProps> | DefineBodyCellProps<RowData>;
  };
  hide?: boolean;
  resizable?: boolean;
  stickyFirst?: boolean;
  stickyLast?: boolean;
};

type TableCommonStates<RowData extends AnyObject = AnyObject> = {
  colDefs: ColumnDef<RowData>[];
};

type TableCommonProps<RowData extends AnyObject = AnyObject> = Omit<
  BoxProps,
  "slots"
> & {
  data?: RowData[];
  columns?: ColumnDef[];
  slots?: {
    HeaderRow?: TableRowComponent;
    BodyRow?: TableRowComponent;
    Container?: TableContainerComponent;
    Table?: TableComponent;
    TableHead?: TableHeadComponent;
    TableBody?: TableBodyComponent;
  };
  slotProps?: {
    virtuoso?: Partial<Parameters<typeof TableVirtuoso<RowData>>[0]>;
    headerRow?: Partial<TableRowProps>;
    bodyRow?: Partial<TableRowProps> | DefineBodyRowProps<RowData>;
    container?: Partial<TableContainerProps>;
    table?: Partial<TableProps>;
    tableHead?: Partial<TableHeadProps>;
    tableBody?: Partial<TableBodyProps>;
  };
};

const { StatesProvider, useGetState, useInitState, useSetState } =
  createStatesContext<TableCommonStates>({
    colDefs: [],
  });

function createStateHooks<RowData extends AnyObject = AnyObject>() {
  return {
    // @ts-ignore
    useGetStateTable: useGetState as UseGetState<TableCommonStates<RowData>>,
    useInitStateTable: useInitState as UseInitState<TableCommonStates<RowData>>,
    useSetStateTable: useSetState as UseSetState<TableCommonStates<RowData>>,
  };
}

const ColDefsInit = memo(({ columns }: { columns?: ColumnDef[] }) => {
  useInitState("colDefs", columns, { when: "whenever-value-changes" });
  return null;
});

ColDefsInit.displayName = "ColDefsInit";

function createColumn<RowData extends AnyObject = AnyObject>(
  colDef: Omit<ColumnDef<RowData>, "_key">
) {
  return { ...colDef, _key: GUID() } as ColumnDef<RowData>;
}

function createVirtuosoComponents<RowData extends AnyObject = AnyObject>({
  slots = {},
  slotProps = {},
}: {
  slots?: {
    Container?: TableContainerComponent;
    Table?: TableComponent;
    TableHead?: TableHeadComponent;
    TableRow?: TableRowComponent;
    TableBody?: TableBodyComponent;
  };
  slotProps?: {
    container?: Partial<TableContainerProps>;
    table?: Partial<TableProps>;
    tableHead?: Partial<TableHeadProps>;
    tableRow?: Partial<TableRowProps> | DefineBodyRowProps<RowData>;
    tableBody?: Partial<TableBodyProps>;
  };
}) {
  const {
    Container = TableContainerStyled,
    Table = TableStyled,
    TableHead = TableHeadStyled,
    TableRow = TableRowStyled,
    TableBody = TableBodyStyled,
  } = slots;

  const {
    container: containerProps,
    table: tableProps,
    tableHead: tableHeadProps,
    tableBody: tableBodyProps,
    tableRow: tableRowProps,
  } = slotProps;

  const components: TableComponents<RowData> = {
    Scroller: forwardRef<HTMLDivElement>((props, ref) => (
      <Container component={Paper} {...props} ref={ref} {...containerProps} />
    )),
    Table: forwardRef((props, ref) => (
      <Table
        {...props}
        {...tableProps}
        sx={{
          borderCollapse: "separate",
          tableLayout: "fixed",
          ...tableProps?.sx,
        }}
        ref={ref as any}
      />
    )),
    TableHead: forwardRef((props, ref) => (
      <TableHead {...props} ref={ref as any} {...tableHeadProps} />
    )),
    TableRow: forwardRef(({ item, ...props }, ref) => {
      let customProps = {};
      if (typeof tableRowProps === "object") customProps = tableRowProps;
      if (typeof tableRowProps === "function")
        customProps = tableRowProps({
          row: item,
          rowIndex: +props["data-index"],
        });
      return <TableRow ref={ref as any} {...customProps} {...props} />;
    }),
    TableBody: forwardRef<HTMLTableSectionElement>((props, ref) => (
      <TableBody {...props} ref={ref} {...tableBodyProps} />
    )),
  };
  return components;
}

function HeaderContent({
  Component = MuiTableRow,
  props,
}: {
  Component?: TableRowComponent;
  props?: Partial<TableRowProps>;
}) {
  const colDefs = useGetState((s) => s?.colDefs);
  return (
    <Component {...props}>
      {colDefs?.map?.(
        ({ _key, field, head, slots = {}, slotProps = {} }, i) => {
          const inner = head || null;
          const Cell = slots.Head || TableCell;
          const cellProps =
            typeof slotProps.head === "function"
              ? slotProps.head({
                  columnIndex: i,
                  _key,
                  field,
                })
              : slotProps.head || {};
          return (
            <Cell key={_key} variant="head" {...cellProps}>
              {inner}
            </Cell>
          );
        }
      )}
    </Component>
  );
}

function RowCells<RowData extends AnyObject = AnyObject>({
  rowIndex,
  row,
}: {
  rowIndex: number;
  row: RowData;
}) {
  const colDefs = useGetState((s) => s?.colDefs);
  return (
    <>
      {colDefs?.map?.(({ _key, field, slots = {}, slotProps = {} }, i) => {
        const inner = !field ? null : (get(row, field, null) as string | null);
        const Cell = slots.Cell || TableCell;
        const cellProps =
          typeof slotProps.cell === "function"
            ? slotProps.cell({
                columnIndex: i,
                row,
                rowIndex,
                _key,
                field,
              })
            : slotProps.cell || {};
        return (
          <Cell
            key={_key}
            row={row}
            rowIndex={rowIndex}
            columnIndex={i}
            field={field}
            {...cellProps}
          >
            {inner}
          </Cell>
        );
      })}
    </>
  );
}

function createHeaderComponent({
  Component = MuiTableRow,
  props,
}: {
  Component?: TableRowComponent;
  props?: Partial<TableRowProps>;
}) {
  return function fixedHeaderContent() {
    return <HeaderContent Component={Component} props={props} />;
  };
}

function itemContent(rowIndex: number, row: AnyObject) {
  return <RowCells rowIndex={rowIndex} row={row} />;
}

const BoxTableRoot = styled(Box)<BoxProps>({
  width: "100%",
}) as typeof Box;

const TableCommon = forwardRef(
  <RowData extends AnyObject = AnyObject>(
    {
      columns,
      data = [],
      height = "500px",
      slots = {},
      slotProps = {},
      ...props
    }: TableCommonProps<RowData>,
    ref?: Ref<HTMLDivElement>
  ) => {
    const { HeaderRow, Container, BodyRow, Table, TableBody, TableHead } =
      slots;
    const {
      headerRow: headerRowProps,
      virtuoso: virtuosoProps,
      bodyRow,
      container: containerProps,
      table: tableProps,
      tableBody: tableBodyProps,
      tableHead: tableHeadProps,
    } = slotProps;

    const components = createVirtuosoComponents<RowData>({
      slots: {
        Container,
        Table,
        TableBody,
        TableHead,
        TableRow: BodyRow,
      },
      slotProps: {
        container: containerProps,
        table: tableProps,
        tableBody: tableBodyProps,
        tableHead: tableHeadProps,
        tableRow: bodyRow,
      },
    });

    const fixedHeaderContent = createHeaderComponent({
      Component: HeaderRow,
      props: headerRowProps,
    });

    return (
      <StatesProvider>
        <ColDefsInit columns={columns} />
        <BoxTableRoot ref={ref} component={Paper} height={height} {...props}>
          <TableVirtuoso
            data={data}
            components={components}
            itemContent={itemContent}
            fixedHeaderContent={fixedHeaderContent}
            {...virtuosoProps}
          />
        </BoxTableRoot>
      </StatesProvider>
    );
  }
) as <RowData extends AnyObject = AnyObject>(
  props: TableCommonProps<RowData> & { ref?: ForwardedRef<HTMLDivElement> }
) => JSX.Element;

// @ts-ignore
TableCommon.displayName = "TableCommon";

export default TableCommon;
export { createColumn, createStateHooks };
export type {
  ColumnDef,
  CustomTableCellComponent,
  DefineBodyCellProps,
  DefineBodyRowProps,
  DefineHeadCellProps,
  TableBodyComponent,
  TableCellComponent,
  TableCommonProps,
  TableCommonStates,
  TableComponent,
  TableContainerComponent,
  TableHeadComponent,
  TableRowComponent,
};
