import { Controller, Get, Param, Query } from "@nestjs/common";
import {
  DataPerPage,
  FindAllShopeeProductDto,
  ShopeeProductDto,
} from "./shopee-product.dto";
import { ShopeeProductService } from "./shopee-product.service";

@Controller("shopee-product")
export class ShopeeProductController {
  constructor(private readonly service: ShopeeProductService) {}

  @Get()
  getAll(
    @Query("pageIndex") pageIndex: FindAllShopeeProductDto["pageIndex"],
    @Query("pageSize") pageSize: FindAllShopeeProductDto["pageSize"],
  ): DataPerPage {
    return this.service.findAll({ pageIndex, pageSize });
  }

  @Get(":id")
  getOne(@Param("id") id: number): ShopeeProductDto | null {
    return this.service.findOne(id);
  }
}
