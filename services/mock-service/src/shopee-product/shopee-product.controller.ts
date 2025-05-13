import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from "@nestjs/common";
import { ShopeeProductService } from "./shopee-product.service";
import {
  CreateShopeeProductDto,
  UpdateShopeeProductDto,
} from "./shopee-product.dto";

@Controller("shopee-product")
export class ShopeeProductController {
  constructor(private readonly service: ShopeeProductService) {}

  @Get()
  getAll() {
    return this.service.findAll();
  }

  @Get(":id")
  getOne(@Param("id") id: number) {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() createPetDto: CreateShopeeProductDto) {
    return this.service.create(createPetDto);
  }

  @Put(":id")
  update(
    @Param("id") id: number,
    @Body() updatePetDto: UpdateShopeeProductDto,
  ) {
    return this.service.update(id, updatePetDto);
  }

  @Delete(":id")
  delete(@Param("id") id: number) {
    return this.service.remove(id);
  }
}
