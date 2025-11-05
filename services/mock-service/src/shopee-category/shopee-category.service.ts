import { Injectable } from "@nestjs/common";
import data from "./data/category-list.json";
import { ShopeeCategoryDto } from "./shopee-category.dto";

@Injectable()
export class ShopeeCategoryService {
  private records: ShopeeCategoryDto[] = data.category_list;

  findAll(): ShopeeCategoryDto[] {
    return this.records;
  };

  findOne(id: number): ShopeeCategoryDto | null | undefined {
    return this.records.find((record) => record.catid === id);
  };
};
