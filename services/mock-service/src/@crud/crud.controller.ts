import { DataPerPage, FindAllDto } from "@/@common-dto/pagination-query.dto";
import { ApiBaseResponse, BaseResponse } from "@/@common-dto/response.dto";
import { ApiDoc } from "@/@decorators/api-doc.decorator";
import { JwtAuthGuard } from "@/sso/jwt.guard";
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards
} from "@nestjs/common";
import {
  ApiOperation,
  ApiParam,
  ApiTags
} from "@nestjs/swagger";
import { CreateDto, DataRowDto, UpdateDto } from "./crud.dto";
import { CRUDService } from "./crud.service";

@ApiTags("Basic CRUD")
@UseGuards(JwtAuthGuard)
@Controller("basic-crud")
export class CRUDController {
  constructor(private readonly mainService: CRUDService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Retrieve paginated list of records",
    description: "Returns a paginated dataset based on the provided query parameters",
  })
  @ApiDoc({
    payloadType: FindAllDto,
    responseDataType: DataPerPage<DataRowDto>,
    okMessage: "Successfully retrieved list of records",
    errorMessage: "failed to fetch records",
    referenceTypes: [DataRowDto, DataPerPage]
  })
  async getAll(
    @Body() payload: FindAllDto<DataRowDto>
  ): ApiBaseResponse<DataPerPage<DataRowDto>> {
    try {
      const data = await this.mainService.findAll(payload);
      return { data };
    } catch (error) {
      throw BaseResponse.httpException({ message: "Failed to fetch list of records", error });
    }
  }

  @Get(":id")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Retrieve a single record based on id",
    description: "Returns a single record",
  })
  @ApiParam({ name: "id" })
  @ApiDoc({
    responseDataType: DataRowDto,
    errorMessage: "failed to fetch record",
  })
  async getOne(@Param("id") id: string): ApiBaseResponse<DataRowDto> {
    try {
      const data = await this.mainService.findOne(id);

      if (!data || !data.id) {
        throw new Error("", { cause: HttpStatus.NOT_FOUND });
      }

      return { data };
    } catch (error) {
      throw BaseResponse.httpException({ message: "Failed to fetch record", error });
    }
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: "create a new record",
    description: "Returns the recently created record",
  })
  @ApiDoc({
    payloadType: CreateDto,
    responseDataType: DataRowDto,
    errorMessage: "Failed to create new record",
  })
  async create(@Body() dto: CreateDto): ApiBaseResponse<DataRowDto> {
    try {
      const data = await this.mainService.create(dto);

      if (!data || !data.id) {
        throw new Error();
      }

      return { data };
    } catch (error) {
      throw BaseResponse.httpException({ message: "Failed to create new record", error });
    }
  }

  @Put(":id")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "update a single record",
    description: "Returns the record with new state",
  })
  @ApiParam({ name: "id" })
  @ApiDoc({
    payloadType: UpdateDto,
    responseDataType: DataRowDto,
    errorMessage: "Failed to update record",
  })
  async update(
    @Param("id") id: string,
    @Body() dto: UpdateDto,
  ): ApiBaseResponse<DataRowDto> {
    try {
      const data = await this.mainService.update(id, dto);

      if (!data) {
        throw new Error();
      }

      return { data };
    } catch (error) {
      throw BaseResponse.httpException({ message: "Failed to update record", error });
    }
  }

  @Delete(":id")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "remove a single record",
    description: "Returns the record",
  })
  @ApiParam({ name: "id" })
  @ApiDoc({
    responseDataType: DataRowDto,
    errorMessage: "Failed to delete record",
  })
  async delete(@Param("id") id: string): ApiBaseResponse<DataRowDto> {
    try {
      const data = await this.mainService.remove(id);

      if (!data) {
        throw new Error();
      }

      return { data };
    } catch (error) {
      throw BaseResponse.httpException({ message: "Failed to delete record", error });
    }
  }
}
