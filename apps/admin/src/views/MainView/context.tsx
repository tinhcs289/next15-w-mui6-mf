"use client";

import PaginatedList, {
  createStateHooks,
  ListStatesInitializer,
  ReactQueryInitializer,
} from "@shared/paginated-list";
import type { ReactNode } from "react";
import { queryFn } from "./services";
import type { RowData } from "./types";

const {
  useGetPaginatedListState,
  useInitPaginatedListState,
  usePaginatedListCallback,
  useSetPaginatedListState,
} = createStateHooks<RowData>();

export {
  useGetPaginatedListState,
  useInitPaginatedListState,
  usePaginatedListCallback,
  useSetPaginatedListState,
};

export function ShopeeProductListProvider({
  children,
}: {
  children?: ReactNode;
}) {
  return (
    <PaginatedList>
      <ListStatesInitializer idField="itemid" pageSize={60} />
      <ReactQueryInitializer queryKey="shopee:product-list" queryFn={queryFn} />
      {children}
    </PaginatedList>
  );
}
