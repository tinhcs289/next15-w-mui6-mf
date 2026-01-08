import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsInt, IsObject, IsString } from "class-validator";

export class ShopeeCategoryDto {
  @ApiProperty({ type: Number })
  @IsInt()
  catid: number;

  @ApiPropertyOptional({ type: Number })
  @IsInt()
  parent_catid?: number;

  @ApiPropertyOptional({ type: String })
  @IsString()
  name?: string;

  @ApiPropertyOptional({ type: String })
  @IsString()
  display_name?: string;

  @ApiPropertyOptional({ type: String })
  @IsString()
  image?: string;

  @ApiPropertyOptional({ type: String })
  @IsString()
  selected_image?: string;

  @ApiPropertyOptional({ type: String })
  @IsString()
  unselected_image?: string;

  @ApiPropertyOptional({ type: Number })
  @IsInt()
  level?: number;

  @ApiPropertyOptional({ type: Object })
  @IsString()
  block_buyer_platform?: object;

  @ApiPropertyOptional({ type: [ShopeeCategoryDto] })
  @IsObject()
  children?: ShopeeCategoryDto[];

  constructor(data: {
    catid: number;
    parent_catid?: number;
    name?: string;
    display_name?: string;
    image?: string;
    unselected_image?: string;
    selected_image?: string;
    level?: number;
    block_buyer_platform?: object;
    children?: ShopeeCategoryDto[];
  }) {
    this.catid = data.catid;
    this.parent_catid = data.parent_catid;
    this.name = data.name;
    this.display_name = data.display_name;
    this.image = data.image;
    this.unselected_image = data.unselected_image;
    this.selected_image = data.selected_image;
    this.level = data.level;
    this.block_buyer_platform = data.block_buyer_platform;
    this.children = data.children;
  }
}
