
import { column, ColumnDef } from "@shared/data-table";
import type { RowData } from "./types";

export const columns: ColumnDef<RowData>[] = [
  column.select(),
  column.rowIndex<RowData>({ head: "Stt", sortable: true }),
  column.base<RowData>({
    field: "itemid",
    head: "Mã Sản phẩm Mã Sản phẩm Mã Sản phẩm Mã Sản phẩm Mã Sản phẩm",
    width: 120,
    slotProps: {
      headCellLabel: {
        title: "Mã Sản phẩm Mã Sản phẩm Mã Sản phẩm Mã Sản phẩm Mã Sản phẩm",
      },
      bodyCellContent: {
        sx: {
          color: (theme) => theme.palette.primary.dark,
          justifyContent: "center",
        },
      },
    },
  }),
  column.image<RowData>({
    field: "image",
    head: "Hình ảnh",
    getSrc: ({ row }) =>
      !row.image ? "" : `https://cf.shopee.vn/file/${row.image}`,
    getAlt: ({ row }) => row.name || "",
  }),
  column.base<RowData>({
    field: "name",
    head: "Sản phẩm",
  }),
  column.currency<RowData>({
    field: "price",
    head: "Giá",
    width: 250,
    sortable: true,
  }),
  column.nunberCount<RowData>({
    field: "historical_sold",
    head: "Đã bán",
    width: 100,
    sortable: true,
  }),
];
