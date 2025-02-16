import { getShopeeProducts } from "@shared/mock/shopee";
import type { GetPaginatedList } from "@shared/utils-react/paginated-list";
import type { RowData } from "./types";

export const queryFn: GetPaginatedList<RowData> = async ({ pageIndex = 1 }) => {
  const result = await getShopeeProducts({ pageIndex });
  return result;
}