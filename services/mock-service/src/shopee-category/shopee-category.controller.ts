import {
  Controller,
  Get,
  Param
} from "@nestjs/common";
import { ShopeeCategoryService } from "./shopee-category.service";

@Controller("shopee-category")
export class ShopeeCategoryController {
  constructor(private readonly mainService: ShopeeCategoryService) {}

  @Get()
  getAll() {
    return this.mainService.findAll();
  }

  @Get(":id")
  getOne(@Param("id") id: number) {
    return this.mainService.findOne(id);
  }
}
