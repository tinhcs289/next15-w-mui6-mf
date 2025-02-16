"use client";

import DataTable from "@shared/data-table";
import { columns } from "../constants";
import { useGetPaginatedListState } from "../context";
import type { RowData } from "../types";

export default function TableShopeeProduct() {
  const rows = useGetPaginatedListState(s => s?.itemsInPage);
  const loading = useGetPaginatedListState(s => s?.requestState === "fetching");

  return (
    <DataTable<RowData>
      loading={loading}
      rows={rows}
      sx={{ height: "100%" }}
      columns={columns}
      rowIdentity="itemid"
      columnsReOrder
      emptyDisplay="No data!"
      loadingDisplay="Loading..."
    />
  );
}
