import "tsconfig-paths/register";

import { NestFactory } from "@nestjs/core";
import { AppModule } from "./@app/app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: false,
  });

  await app.listen(3001);
}
bootstrap();
