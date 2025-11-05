import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import { CreateDto, DataPerPage, DataRowDto, FindAllDto, UpdateDto } from "./crud.dto";
import { CRUDService } from "./crud.service";

@Controller("basic-crud")
export class CRUDController {
  constructor(private readonly mainService: CRUDService) {}

  @Get()
  getAll(
    @Query("pageIndex") pageIndex: FindAllDto["pageIndex"],
    @Query("pageSize") pageSize: FindAllDto["pageSize"],
  ): DataPerPage {
    return this.mainService.findAll({ pageIndex, pageSize });
  }

  @Get(":id")
  getOne(@Param("id") id: string): DataRowDto | null | undefined {
    return this.mainService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateDto): DataRowDto {
    return this.mainService.create(dto);
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() dto: UpdateDto): DataRowDto | null {
    return this.mainService.update(id, dto);
  }

  @Delete(":id")
  delete(@Param("id") id: string): DataRowDto | null {
    return this.mainService.remove(id);
  }
}
