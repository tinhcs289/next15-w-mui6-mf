import { HttpException, HttpStatus } from "@nestjs/common";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class RequestError {
  @ApiProperty({ type: String })
  error_code: string;

  @ApiProperty({ type: String })
  message: string;

  constructor(data: { error_code: string; message: string }) {
    this.error_code = data.error_code;
    this.message = data.message;
  }
}

export class BaseResponse<T = any> {
  @ApiPropertyOptional({ type: String })
  status_code?: string | null;

  @ApiPropertyOptional({ type: String })
  message?: string | null;

  @ApiPropertyOptional({ type: Object })
  data?: T | null;

  @ApiPropertyOptional({ type: [RequestError] })
  errors?: RequestError[] | null;

  constructor(data: {
    status_code?: string | null;
    message?: string | null;
    data?: T | null;
    errors?: RequestError[] | null;
  }) {
    this.status_code = data?.status_code ?? null;
    this.message = data?.message ?? null;
    this.data = data?.data ?? null;
    this.errors = data?.errors ?? null;
  }

  static httpException({
    message = "Bad request",
    status = HttpStatus.BAD_REQUEST,
    error,
  }: {
    message?: string;
    status?: HttpStatus;
    error?: Error | any;
  }) {
    return new HttpException({ message }, status, { cause: error });
  }
}

export type ApiBaseResponse<T> = Promise<BaseResponse<T>>;
