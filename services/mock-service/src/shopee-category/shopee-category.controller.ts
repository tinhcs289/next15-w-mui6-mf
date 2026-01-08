import { ApiBaseResponse, BaseResponse } from "@/@common-dto/response.dto";
import { ApiDoc } from "@/@decorators/api-doc.decorator";
import { Controller, Get, HttpCode, HttpStatus, Param } from "@nestjs/common";
import { ApiOperation, ApiParam } from "@nestjs/swagger";
import { ShopeeCategoryDto } from "./shopee-category.dto";
import { ShopeeCategoryService } from "./shopee-category.service";

@Controller("shopee-category")
export class ShopeeCategoryController {
  constructor(private readonly mainService: ShopeeCategoryService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Retrieve list of categories" })
  @ApiDoc({
    responseDataType: Array<ShopeeCategoryDto>,
    okMessage: "Successfully retrieved list of records",
    errorMessage: "failed to fetch records",
    referenceTypes: [ShopeeCategoryDto],
  })
  async getAll(): ApiBaseResponse<ShopeeCategoryDto[]> {
    try {
      const data = await this.mainService.findAll();
      return { data };
    } catch (error) {
      throw BaseResponse.httpException({
        message: "Failed to fetch list of records",
        error,
      });
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
    responseDataType: ShopeeCategoryDto,
    errorMessage: "failed to fetch record",
  })
  async getOne(@Param("id") id: number): ApiBaseResponse<ShopeeCategoryDto> {
    try {
      const data = await this.mainService.findOne(id);
      if (!data || !data.catid) {
        throw new Error("", { cause: HttpStatus.NOT_FOUND });
      }
      return { data };
    } catch (error) {
      throw BaseResponse.httpException({
        message: "Failed to fetch record",
        error,
      });
    }
  }
}
