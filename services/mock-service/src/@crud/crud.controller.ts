import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from "@nestjs/common";
import { CRUDService } from "./crud.service";
import { CreateDto, UpdateDto } from "./crud.dto";

@Controller("basic-crud")
export class CRUDController {
  constructor(private readonly mainService: CRUDService) {}

  @Get()
  getAll() {
    return this.mainService.findAll();
  }

  @Get(":id")
  getOne(@Param("id") id: string) {
    return this.mainService.findOne(id);
  }

  @Post()
  create(@Body() createPetDto: CreateDto) {
    return this.mainService.create(createPetDto);
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() updatePetDto: UpdateDto) {
    return this.mainService.update(id, updatePetDto);
  }

  @Delete(":id")
  delete(@Param("id") id: string) {
    return this.mainService.remove(id);
  }
}
