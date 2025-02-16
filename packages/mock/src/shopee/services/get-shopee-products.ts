import wait from "@shared/utils/async/wait";
import page1 from "../data/product-p-1.json";
import page2 from "../data/product-p-2.json";
import page3 from "../data/product-p-3.json";
import page4 from "../data/product-p-4.json";
import page5 from "../data/product-p-5.json";
import page6 from "../data/product-p-6.json";
import page7 from "../data/product-p-7.json";
import page8 from "../data/product-p-8.json";
import page9 from "../data/product-p-9.json";
import type { ShopeeProductItem } from "../types";

const productmock = {
  1: page1,
  2: page2,
  3: page3,
  4: page4,
  5: page5,
  6: page6,
  7: page7,
  8: page8,
  9: page9,
};

export const getShopeeProducts = async ({
  pageIndex: i = 1,
  pageSize = 60,
}: {
  pageIndex: number;
  pageSize?: number;
}): Promise<{
  totalCount: number;
  result: ShopeeProductItem[];
}> => {
  await wait(1000);
  const result = {
    // @ts-ignore
    totalCount: productmock[i].total as number,
    // @ts-ignore
    result: productmock[i].item as ShopeeProductItem[],
  };
  return result;
};
