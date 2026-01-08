import { CRUDModule } from "@/@crud/crud.module";
import { ShopeeProductCategoryModule } from "@/shopee-category/shopee-category.module";
import { ShopeeProductModule } from "@/shopee-product/shopee-product.module";
import { SsoModule } from "@/sso/sso.module";
import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";

@Module({
  imports: [SsoModule, CRUDModule, ShopeeProductModule, ShopeeProductCategoryModule],
  controllers: [AppController],
})
export class AppModule {}
