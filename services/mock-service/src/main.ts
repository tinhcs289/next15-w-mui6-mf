import "tsconfig-paths/register";

import { BadRequestException, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./@app/app.module";

const { PORT = 4444 } = process.env;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,

      exceptionFactory: (errors) => {
        const formattedErrors = errors.flatMap((err) =>
          Object.entries(err.constraints as any).map(
            ([constraintKey, message]) => ({
              error_code: constraintKey.toUpperCase(),
              message,
            }),
          ),
        );

        return new BadRequestException({
          status_code: "BAD_REQUEST",
          message: "Validation failed",
          errors: formattedErrors,
        });
      },
    }),
  );

  app.enableCors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: false,
  });

  SwaggerModule.setup(
    "api",
    app,
    SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .setTitle("Mock for REST API")
        .setDescription("Mock for REST API")
        .setVersion("1.0")
        .addTag("tag")
        .addBearerAuth()
        .build(),
    ),
  );

  await app.listen(PORT);
}
bootstrap();
