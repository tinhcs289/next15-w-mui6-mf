import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from "@nestjs/common";
import { PetsService } from "./pets.service";
import { CreatePetDto, UpdatePetDto } from "./pets.dto";

@Controller("pets")
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @Get()
  getAll() {
    return this.petsService.findAll();
  }

  @Get(":id")
  getOne(@Param("id") id: string) {
    return this.petsService.findOne(id);
  }

  @Post()
  create(@Body() createPetDto: CreatePetDto) {
    return this.petsService.create(createPetDto);
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() updatePetDto: UpdatePetDto) {
    return this.petsService.update(id, updatePetDto);
  }

  @Delete(":id")
  delete(@Param("id") id: string) {
    return this.petsService.remove(id);
  }
}
