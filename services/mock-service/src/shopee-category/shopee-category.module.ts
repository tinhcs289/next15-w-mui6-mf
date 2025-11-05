import { Module } from "@nestjs/common";
import { ShopeeCategoryController } from "./shopee-category.controller";
import { ShopeeCategoryService } from "./shopee-category.service";

@Module({
  controllers: [ShopeeCategoryController],
  providers: [ShopeeCategoryService],
})
export class ShopeeProductCategoryModule {}
