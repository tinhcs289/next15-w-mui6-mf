import { http } from "@shared/http-client";
import type { GetPaginatedList } from "@shared/paginated-list";
import tryDo from "@shared/utils/async/tryDo";
import type { RowData } from "./types";

export const queryFn: GetPaginatedList<RowData> = async ({ pageIndex = 1 }) => {
  const [error, response] = await tryDo(
    http.get<{ total: number; item: RowData[] }>(
      "http://localhost:4444/shopee-product",
      {
        params: { pageIndex },
      }
    )
  );

  if (error || !response?.data?.item?.length) {
    return { totalCount: 0, result: [] };
  }

  return {
    totalCount: response.data.total,
    result: response.data.item,
  };
};
