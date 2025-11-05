import { Module } from "@nestjs/common";
import { ShopeeProductController } from "./shopee-product.controller";
import { ShopeeProductService } from "./shopee-product.service";

@Module({
  controllers: [ShopeeProductController],
  providers: [ShopeeProductService],
})
export class ShopeeProductModule {}
