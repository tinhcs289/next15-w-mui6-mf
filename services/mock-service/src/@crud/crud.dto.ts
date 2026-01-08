import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsInt, IsString } from "class-validator";

export class DataRowDto {
  @ApiPropertyOptional()
  id?: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  species: string;

  @ApiProperty()
  age: number;

  constructor(data: {
    id?: string;
    name: string;
    species: string;
    age: number;
  }) {
    this.id = data.id;
    this.name = data.name;
    this.species = data.species;
    this.age = data.age;
  }
}

export class CreateDto {
  @ApiProperty()
  @IsString({
    message: "[name] must be a string",
  })
  name: string;

  @ApiProperty()
  @IsString({
    message: "[species] must be a string",
  })
  species: string;

  @ApiProperty()
  @IsInt({
    message: "[age] must be an integer",
  })
  age: number;

  constructor(data: { name: string; species: string; age: number }) {
    this.name = data.name;
    this.species = data.species;
    this.age = data.age;
  }
}

export class UpdateDto extends CreateDto {
  @ApiProperty()
  @IsString({
    message: "[id] must be a string",
  })
  id: string;

  constructor(data: {
    id: string;
    name: string;
    species: string;
    age: number;
  }) {
    super(data);
    this.id = data.id;
  }
}
