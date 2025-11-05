import { Injectable } from "@nestjs/common";
import page1 from "./data/product-p-1.json";
import page2 from "./data/product-p-2.json";
import page3 from "./data/product-p-3.json";
import page4 from "./data/product-p-4.json";
import page5 from "./data/product-p-5.json";
import page6 from "./data/product-p-6.json";
import page7 from "./data/product-p-7.json";
import page8 from "./data/product-p-8.json";
import page9 from "./data/product-p-9.json";
import {
  FindAllShopeeProductDto,
  ShopeeProductDto
} from "./shopee-product.dto";

type DataPerPage = {
  total: number;
  item: ShopeeProductDto[];
};

@Injectable()
export class ShopeeProductService {
  private listData: {
    [pageIndex: number]: {
      total: number;
      item: ShopeeProductDto[];
    };
  } = {
    1: page1 as unknown as DataPerPage,
    2: page2 as unknown as DataPerPage,
    3: page3 as unknown as DataPerPage,
    4: page4 as unknown as DataPerPage,
    5: page5 as unknown as DataPerPage,
    6: page6 as unknown as DataPerPage,
    7: page7 as unknown as DataPerPage,
    8: page8 as unknown as DataPerPage,
    9: page9 as unknown as DataPerPage,
  };

  findAll({
    pageIndex = 1,
    pageSize: _ = 60,
  }: FindAllShopeeProductDto): DataPerPage {
    return this.listData[pageIndex];
  }

  findOne(id: number) {
    for (const pageIndex in this.listData) {
      const page = this.listData[pageIndex];
      const foundItem = page.item.find((product) => product.itemid === id);
      if (foundItem) {
        return foundItem;
      }
    }
    return null;
  }
}
