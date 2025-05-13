import { PetsModule } from "@/pets/pets.module";
import { ShopeeProductModule } from "@/shopee-product/shopee-product.module";
import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";

@Module({
  imports: [PetsModule, ShopeeProductModule],
  controllers: [AppController],
})
export class AppModule {}
