import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class SignInDto {
  @ApiProperty()
  @IsString({ message: "[username] must be a string" })
  username: string;

  @ApiProperty()
  @IsString({ message: "[password] must be a string" })
  password: string;

  constructor(data: { username: string; password: string }) {
    this.username = data.username;
    this.password = data.password;
  }
}

export class SignInResultDto {
  @ApiProperty()
  @IsString({ message: "[access_token] must be a string" })
  access_token: string;

  @ApiProperty()
  @IsString({ message: "[refresh_token] must be a string" })
  refresh_token: string;
  constructor(data: { access_token: string; refresh_token: string }) {
    this.access_token = data.access_token;
    this.refresh_token = data.refresh_token;
  }
}

export class RefreshTokenDto {
  @ApiProperty()
  @IsString({ message: "[refresh_token] must be a string" })
  refresh_token: string;
  constructor(data: { refresh_token: string }) {
    this.refresh_token = data.refresh_token;
  }
}
