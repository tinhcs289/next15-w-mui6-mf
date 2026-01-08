import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { SsoService } from "./sso.service";
import { SsoController } from "./sso.controller";
import { JwtStrategy } from "./jwt.strategy";

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY || "your-secret-key",
      signOptions: { expiresIn: "1d" },
    }),
  ],
  providers: [SsoService, JwtStrategy],
  controllers: [SsoController],
})
export class SsoModule {}
