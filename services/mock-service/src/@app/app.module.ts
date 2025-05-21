import { ShopeeProductModule } from "@/shopee-product/shopee-product.module";
import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";

@Module({
  imports: [ShopeeProductModule],
  controllers: [AppController],
})
export class AppModule {}
