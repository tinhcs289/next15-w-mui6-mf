import { Injectable } from "@nestjs/common";
import data from "./data/category-list.json";
import { ShopeeCategoryDto } from "./shopee-category.dto";

@Injectable()
export class ShopeeCategoryService {
  private records: ShopeeCategoryDto[] = data.category_list as unknown as ShopeeCategoryDto[];

  async findAll(): Promise<ShopeeCategoryDto[]> {
    return this.records;
  };

  async findOne(id: number): Promise<ShopeeCategoryDto | null> {
    return this.records.find((record) => record.catid === id) || null;
  };
};
