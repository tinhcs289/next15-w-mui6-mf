import "tsconfig-paths/register";

import { NestFactory } from "@nestjs/core";
import { AppModule } from "./@app/app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

const { PORT = 4444 } = process.env;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: false,
  });

  const config = new DocumentBuilder()
    .setTitle("Mock for REST API")
    .setDescription("Mock for REST API")
    .setVersion("1.0")
    .addTag("tag")
    .build();

  const document = SwaggerModule.createDocument(app, config);

  /**
   * @see http://localhost:<PORT>/api
   */
  SwaggerModule.setup("api", app, document);
  

  await app.listen(PORT);
}
bootstrap();
