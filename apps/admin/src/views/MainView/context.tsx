"use client";

import PaginatedList, { createStateHooks, ListStatesInitializer, ReactQueryInitializer } from "@shared/utils-react/paginated-list";
import type { ReactNode } from "react";
import { queryFn } from "./services";
import type { RowData } from "./types";

const {
  useGetPaginatedListState,
  useInitPaginatedListState,
  usePaginatedListMethod,
  useSetPaginatedListState,
} = createStateHooks<RowData>();

export {
  useGetPaginatedListState,
  useInitPaginatedListState,
  usePaginatedListMethod,
  useSetPaginatedListState
};

export function ShopeeProductListProvider({ children }: { children?: ReactNode }) {
  return (
    <PaginatedList>
      <ListStatesInitializer idField="itemid" pageSize={60} />
      <ReactQueryInitializer
        queryKey="shopee:product-list"
        queryFn={queryFn}
        fetchDataOnFirstMount
      />
      {children}
    </PaginatedList>
  );
}