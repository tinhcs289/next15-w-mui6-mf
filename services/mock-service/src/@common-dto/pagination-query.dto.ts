import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsIn, IsInt, IsObject, IsOptional, IsString } from "class-validator";

export class FindAllDto<T extends Record<string, any> = {}> {
  @ApiProperty({ type: Number })
  @IsInt({
    message: "[pageIndex] must be an integer",
  })
  pageIndex: number;

  @ApiProperty({ type: Number })
  @IsInt({
    message: "[pageSize] must be an integer",
  })
  pageSize: number;

  @ApiPropertyOptional({ type: String, description: "Search keyword" })
  @IsString({
    message: "[search] must be a string",
  })
  search?: string;

  @ApiPropertyOptional({ type: String, description: "Sort field" })
  @IsString({
    message: "[sortBy] must be a string",
  })
  sortBy?: string;

  @ApiPropertyOptional({
    description: "Sort order: 'asc' or 'desc'",
    enum: ["asc", "desc"],
    default: "asc",
  })
  @IsIn(["asc", "desc"], { message: "[sortOrder] must be 'asc' or 'desc'" })
  sortOrder?: "asc" | "desc";

  @ApiPropertyOptional({ description: "Additional filters", type: Object })
  @IsObject({ message: "[filters] must be a plain object" })
  filters?: T;

  constructor(data: {
    pageIndex: number;
    pageSize: number;
    search?: string;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
    filters?: T;
  }) {
    this.pageIndex = data.pageIndex;
    this.pageSize = data.pageSize;
    this.search = data.search;
    this.sortBy = data.sortBy;
    this.sortOrder = data.sortOrder;
    this.filters = data.filters;
  }
}

export class DataPerPage<DataRowDto extends Record<string, any> = {}> {
  @ApiProperty({ type: Number })
  total: number;

  @ApiProperty({ type: [Object] })
  items: DataRowDto[];
  constructor(data: { total: number; items: DataRowDto[] }) {
    this.total = data.total;
    this.items = data.items;
  }
}