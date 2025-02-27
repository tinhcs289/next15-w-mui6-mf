import type { ComponentType } from "react";
import { forwardRef } from "react";
import { Any, DataTableProps } from "../types";
import { StatesProvider } from "./context-states";
import {
  ColumnDefsInitializer,
  ColumnsReOrderInitializer,
  ColumnVisibilitiesInitializer,
  OnColumnsReOrderInitializer,
} from "./init-columns";
import { LoadingInitializer } from "./init-loading";
import {
  RowCompositionsInitializer,
  RowIdentityInitializer,
  RowsInitializer,
} from "./init-rows";
import {
  OnSelectRowsInitializer,
  SelectAllInitializer,
  SelectionInitializer,
} from "./init-selection";
import {
  EmptyDisplayInitializer,
  LoadingDisplayInitializer,
  SlotPropsInitializer,
  SlotsInitializer,
} from "./init-slots";
import { OnSortInitializer } from "./init-sort";

type DataTableComponent<RowData extends Any = Any> = ComponentType<
  DataTableProps<RowData>
>;

export function withStates<RowData extends Any = Any>(
  WrappedComponent: DataTableComponent<RowData>
): DataTableComponent<RowData> {
  const CompositedComponent = forwardRef<
    HTMLDivElement,
    DataTableProps<RowData>
  >(
    (
      {
        rowIdentity,
        columns,
        columnsReOrder,
        loading,
        slotProps,
        slots,
        rowCompositions,
        emptyDisplay,
        loadingDisplay,
        onColumnsReOrder,
        onSelectRows,
        onSort,
        ...props
      },
      ref
    ) => {
      return (
        <StatesProvider>
          <RowIdentityInitializer state={rowIdentity} />
          <RowsInitializer state={props?.rows} />
          <ColumnDefsInitializer state={columns} />
          <ColumnsReOrderInitializer state={columnsReOrder} />
          <ColumnVisibilitiesInitializer />
          <LoadingInitializer state={loading} />
          <SlotsInitializer state={slots} />
          <SlotPropsInitializer state={slotProps} />
          <RowCompositionsInitializer state={rowCompositions} />
          <EmptyDisplayInitializer state={emptyDisplay} />
          <LoadingDisplayInitializer state={loadingDisplay} />
          <OnColumnsReOrderInitializer state={onColumnsReOrder} />
          <SelectAllInitializer />
          <SelectionInitializer />
          <OnSelectRowsInitializer callback={onSelectRows} />
          <OnSortInitializer callback={onSort} />
          <WrappedComponent {...props} ref={ref} />
        </StatesProvider>
      );
    }
  );
  CompositedComponent.displayName = "DataTableWithStates";
  return CompositedComponent as unknown as DataTableComponent<RowData>;
}
