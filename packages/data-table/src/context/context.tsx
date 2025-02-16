"use client";

import {
  createStatesContext,
  UseGetState,
  UseInitState,
  UseSetState,
} from "@shared/utils-react/states-context";
import type { Any, TableStates } from "../types";

const { StatesProvider, useGetState, useInitState, useSetState } =
  createStatesContext<TableStates>({
    rowIdentity: "id",
    columns: [],
    columnVisibilities: [],
    totalWidthOfFreeSizeColumns: 0,
    averageWidthOfFreeSizeColumn: 0,
    tableHeight: 0,
    tableWidth: 0,
    isScrolling: false,
    columnsReOrder: false,
    scrollBlocked: false,
    scrollTop: 0,
  });

function createTableStateHooks<RowData extends Any = Any>() {
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

export {
  createTableStateHooks,
  StatesProvider,
  useGetState,
  useInitState,
  useSetState,
};
