import { BaseResponse, RequestError } from "@/@common-dto/response.dto";
import { applyDecorators, Type } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiExtraModels,
  ApiOkResponse,
  getSchemaPath,
} from "@nestjs/swagger";

export function ApiDoc<TPayload = any, TResponseData = any>({
  payloadType,
  responseDataType,
  okMessage = "OK",
  errorMessage = "Bad Request",
  referenceTypes = [],
}: {
  payloadType?: Type<TPayload>;
  responseDataType?: Type<TResponseData>;
  okMessage?: string;
  errorMessage?: string;
  referenceTypes?: Type<any>[];
}) {

  const extraModels = [BaseResponse, RequestError, ...referenceTypes];
  if (payloadType) extraModels.push(payloadType);
  if (responseDataType) extraModels.push(responseDataType);

  const decorators = [ApiExtraModels(...extraModels)];

  if (payloadType) {
    decorators.push(ApiBody({ type: payloadType }) as any);
  }

  decorators.push(
    ApiOkResponse({
      description: okMessage,
      schema: {
        allOf: [
          { $ref: getSchemaPath(BaseResponse) },
          {
            properties: {
              data: responseDataType
                ? { $ref: getSchemaPath(responseDataType) }
                : { type: "object" },
            },
          },
        ],
      },
    }),
    ApiBadRequestResponse({
      description: errorMessage,
      schema: {
        allOf: [
          { $ref: getSchemaPath(BaseResponse) },
          {
            properties: {
              errors: {
                type: "array",
                items: { $ref: getSchemaPath(RequestError) },
              },
            },
          },
        ],
      },
    })
  );

  return applyDecorators(...decorators);
}
