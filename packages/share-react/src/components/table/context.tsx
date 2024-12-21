"use client";

import type { Any } from "./base.types";
import {
  createStatesContext,
  UseGetState,
  UseInitState,
  UseSetState,
} from "../../utils/states-context";
import type { TableStates } from "./context.types";
import { memo } from "react";

const { StatesProvider, useGetState, useInitState, useSetState } =
  createStatesContext<TableStates>({
    colDefs: [],
    tableHeight: 0,
    visibleColumns: [],
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

const ColDefsInit = memo(
  ({ state }: { state?: Required<TableStates>["colDefs"] }) => {
    useInitState("colDefs", state, { when: "whenever-value-changes" });
    return null;
  }
);
ColDefsInit.displayName = "ColDefsInit";

export {
  createStateHooks,
  ColDefsInit,
  StatesProvider,
  useGetState,
  useInitState,
  useSetState,
};
