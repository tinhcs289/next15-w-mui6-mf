import { ApiBaseResponse, BaseResponse } from "@/@common-dto/response.dto";
import { ApiDoc } from "@/@decorators/api-doc.decorator";
import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Post
} from "@nestjs/common";
import { ApiHeader, ApiOperation } from "@nestjs/swagger";
import { RefreshTokenDto, SignInDto, SignInResultDto } from "./sso.dto";
import { SsoService } from "./sso.service";

@Controller("sso")
export class SsoController {
  constructor(private readonly ssoService: SsoService) {}

  @Post("signin")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "create a new sign-in session",
    description: "Returns a pair of access and refresh tokens",
  })
  @ApiDoc({
    payloadType: SignInDto,
    responseDataType: SignInResultDto,
    okMessage: "Successfully retrieved a pair of access and refresh tokens",
    errorMessage: "Failed to sign in",
  })
  async signIn(@Body() payload: SignInDto): ApiBaseResponse<SignInResultDto> {
    try {
      const tokens = await this.ssoService.signIn(payload);
      return {
        message: "Signed in!",
        data: tokens,
      };
    } catch (error) {
      throw BaseResponse.httpException({ message: "Invalid credentials", error });
    }
  }

  @Post("refresh-token")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Refresh the sign-in session",
    description: `
      Returns a new pair of access and refresh tokens.
      When the current session is expired or about to expire, call this endpoint to refresh.
    `,
  })
  @ApiDoc({
    payloadType: RefreshTokenDto,
    responseDataType: SignInResultDto,
    okMessage: "Successfully retrieved a pair of access and refresh tokens",
    errorMessage: "Refresh token failed",
  })
  async refreshToken(
    @Body() payload: RefreshTokenDto,
  ): ApiBaseResponse<SignInResultDto> {
    try {
      const tokens = await this.ssoService.refreshToken(payload);
      return {
        data: tokens,
      };
    } catch (error) {
      throw BaseResponse.httpException({ message: "Refresh token failed", error });
    }
  }

  @Delete("signout")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "terminate the sign-in session" })
  @ApiHeader({ name: "authorization", description: "Bearer <access_token>" })
  @ApiDoc({
    okMessage: "Successfully terminate the current sign-in session",
    errorMessage: "Sign out failed",
  })
  async signOut(
    @Headers("authorization") authHeader: string,
  ): ApiBaseResponse<string> {
    const token = authHeader?.replace("Bearer ", "");
    try {
      await this.ssoService.signOut(token);
      return {
        message: "Successfully terminate the current sign-in session",
      };
    } catch (error: Error | any) {
      throw BaseResponse.httpException({ message: "Sign out failed", error });
    }
  }

  @Get("verify-token")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Verify the sign-in session" })
  @ApiHeader({ name: "authorization", description: "Bearer <access_token>" })
  @ApiDoc({
    okMessage: "Valid sign-in session",
    errorMessage: "Invalid sign-in session",
  })
  async verify(
    @Headers("authorization") authHeader: string,
  ): Promise<BaseResponse<string>> {
    const token = authHeader?.replace("Bearer ", "");
    try {
      const isValid = await this.ssoService.verify(token);
      if (!isValid) throw new Error();
      return {
        message: "Valid sign-in session",
      };
    } catch (error) {
      throw BaseResponse.httpException({ message: "Invalid sign-in session", error });
    }
  }
}
