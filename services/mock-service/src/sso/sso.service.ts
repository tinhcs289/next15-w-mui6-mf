import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthTokenPayload } from "./jwt.types";
import { RefreshTokenDto, SignInDto, SignInResultDto } from "./sso.dto";

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "your-secret-key";

@Injectable()
export class SsoService {
  constructor(private jwtService: JwtService) {}

  private async validateUser(username: string, password: string) {
    const mockUser = {
      username: "admin",
      password: "admin",
      user_id: "5841314520",
      first_name: "Quynh",
      last_name: "Nguyen",
      preference_language: "en",
      avatar:
        "https://ss-images.saostar.vn/wp700/2025/5/9/pc/1746805414805/d08o7wy4wj1-z3gup8nn0j2-hjhst62gpz3.jpg",
    };

    return username === mockUser.username && password === mockUser.password
      ? mockUser
      : null;
  }

  async signIn(signInDto: SignInDto): Promise<SignInResultDto> {
    const { username, password } = signInDto;
    const user = await this.validateUser(username, password);

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const payload: AuthTokenPayload = {
      user_id: user.user_id,
      username: user.username,
      first_name: user.first_name,
      last_name: user.last_name,
      preference_language: user.preference_language,
      avatar: user.avatar,
    };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: "1d",
      secret: JWT_SECRET_KEY,
    });

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: "7d",
      secret: JWT_SECRET_KEY,
    });

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async refreshToken(
    refreshTokenDto: RefreshTokenDto,
  ): Promise<SignInResultDto> {
    const { refresh_token } = refreshTokenDto;
    try {
      const payload = this.jwtService.verify(refresh_token);
      const newAccessToken = this.jwtService.sign(payload, {
        expiresIn: "1d",
        secret: JWT_SECRET_KEY,
      });
      const newRefreshToken = this.jwtService.sign(payload, {
        expiresIn: "7d",
        secret: JWT_SECRET_KEY,
      });

      return {
        access_token: newAccessToken,
        refresh_token: newRefreshToken,
      };
    } catch (error) {
      throw new Error("Invalid refresh token");
    }
  }

  async signOut(_token: string) {
    return { message: "Signed out successfully" };
  }

  async verify(token: string): Promise<boolean> {
    try {
      this.jwtService.verify(token, {
        secret: JWT_SECRET_KEY,
      });
      return true;
    } catch (error) {
      return false;
    }
  }
}
