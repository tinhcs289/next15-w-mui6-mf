import { ShopeeProductCategoryModule } from "@/shopee-category/shopee-category.module";
import { ShopeeProductModule } from "@/shopee-product/shopee-product.module";
import { AuthModule } from "@/auth/auth.module";
import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";

@Module({
  imports: [AuthModule, ShopeeProductModule, ShopeeProductCategoryModule],
  controllers: [AppController],
})
export class AppModule {}
