"use client";

import {
  createStatesContext,
  UseGetState,
  UseInitState,
  UseSetState,
} from "@repo/utils-react/states-context";
import type { ComponentType, JSX } from "react";
import { forwardRef, memo } from "react";
import type { Any, TableProps, TableStates } from "./base.types";

const { StatesProvider, useGetState, useInitState, useSetState } =
  createStatesContext<TableStates>({
    colDefs: [],
    columnsReOrder: false,
    tableHeight: 0,
    tableWidth: 0,
    visibleColumns: [],
    isScrolling: false,
    scrollBlocked: false,
    scrollTop: 0,
    loading: false,
  });

function createStateHooks<RowData extends Any = Any>() {
  return {
    useGetStateTable: useGetState as unknown as UseGetState<
      TableStates<RowData>
    >,
    useInitStateTable: useInitState as unknown as UseInitState<
      TableStates<RowData>
    >,
    useSetStateTable: useSetState as unknown as UseSetState<
      TableStates<RowData>
    >,
  };
}

const LoadingInitializer = memo(({ state }: { state?: boolean }) => {
  useInitState("loading", state, { when: "whenever-value-changes" });
  return null as unknown as JSX.Element;
});
LoadingInitializer.displayName = "LoadingInitializer";

const HeightInitializer = memo(({ state = 0 }: { state?: number}) => {
  useInitState("tableHeight", state, { when: "whenever-value-changes" });
  return null as unknown as JSX.Element;
});
HeightInitializer.displayName = "HeightInitializer";

const WidthInitializer = memo(({ state = 0 }: { state?: number}) => {
  useInitState("tableWidth", state, { when: "whenever-value-changes" });
  return null as unknown as JSX.Element;
});
WidthInitializer.displayName = "WidthInitializer";

const ColumnsReOrderInitializer = memo(({ state }: { state?: boolean}) => {
  useInitState("columnsReOrder", state, { when: "whenever-value-changes" });
  return null as unknown as JSX.Element;
});
ColumnsReOrderInitializer.displayName = "ColumnsReOrderInitializer";

const ColDefsInit = memo(
  ({ state }: { state?: Required<TableStates>["colDefs"] }) => {
    useInitState("colDefs", state, { when: "whenever-value-changes" });
    return null as unknown as JSX.Element;
  }
);
ColDefsInit.displayName = "ColDefsInit";

type TableComponent<
  RowData extends Any = Any,
> = ComponentType<TableProps<RowData>>;

function withStates<RowData extends Any = Any>(
  WrappedComponent: TableComponent<RowData>
): TableComponent<RowData> {
  const CompositedComponent = forwardRef<HTMLDivElement, TableProps<RowData>>(
    ({ columns, columnsReOrder, loading, ...props }, ref) => {
      return (
        <StatesProvider>
          <ColDefsInit state={columns as any} />
          <ColumnsReOrderInitializer state={columnsReOrder} />
          <LoadingInitializer state={loading} />
          <WrappedComponent {...props} ref={ref} />
        </StatesProvider>
      );
    }
  );
  CompositedComponent.displayName = "TableWithStates";
  return CompositedComponent as unknown as TableComponent<RowData>;
};


export {
  createStateHooks,
  HeightInitializer,
  StatesProvider,
  useGetState,
  useInitState,
  useSetState,
  WidthInitializer,
  withStates,
};

