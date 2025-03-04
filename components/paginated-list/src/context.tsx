"use client";

import type {
  UseCallbackState,
  UseGetState,
  UseInitState,
  UseSetState,
} from "@shared/states-context";
import { createStatesContext } from "@shared/states-context";
import type {
  Any,
  PaginatedListStates
} from "./types";

const {
  StatesProvider,
  useGetState,
  useInitState,
  useSetState,
  useCallbackState,
} = createStatesContext<PaginatedListStates>({
  initialized: {
    states: false,
    request: false,
  },
  idField: "id",
  selectable: true,
  typeOfSelection: "over-all-pages",
  totalCount: 0,
  items: [],
  itemsInPage: [],
  pageIndex: 1,
  pageSize: 20,
  sortBy: [],
  advanceFilter: {},
  selectedItems: [],
  isSelectedAll: false,
  itemToInteract: null,
  itemInteractAction: "",
  itemInteractAnchor: null,
  requestState: "none",
});

function createStateHooks<
  Item extends Any = Any,
  Filter extends Any = Any,
  ExtendedStates extends Any = Any,
>() {
  return {
    useGetPaginatedListState: useGetState as UseGetState<
      PaginatedListStates<Item, Filter, ExtendedStates>
    >,
    useSetPaginatedListState: useSetState as UseSetState<
      PaginatedListStates<Item, Filter, ExtendedStates>
    >,
    useInitPaginatedListState: useInitState as UseInitState<
      PaginatedListStates<Item, Filter, ExtendedStates>
    >,
    usePaginatedListMethod: useCallbackState as UseCallbackState<
      PaginatedListStates<Item, Filter, ExtendedStates>
    >,
  };
}

export {
  createStateHooks,
  StatesProvider, useCallbackState, useGetState,
  useInitState,
  useSetState
};


