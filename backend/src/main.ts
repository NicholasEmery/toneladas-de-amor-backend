import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Logger, ValidationPipe } from "@nestjs/common";
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerCustomOptions,
} from "@nestjs/swagger";
import { version } from "../package.json";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const isProduction = process.env.NODE_ENV === "production";
  app.enableCors({
    origin: isProduction ? process.env.URL_FRONTEND : true,
  });
  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
    .setTitle("Docs API")
    .setDescription(
      "Toneladas de Amor Backend - API documentation for managing and supporting the application's backend services.",
    )
    .setVersion(version)
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  const customOptions: SwaggerCustomOptions = {
    customSiteTitle: "Toneladas de Amor API Docs",
  };
  SwaggerModule.setup("api", app, documentFactory, customOptions);

  const port = process.env.PORT || 3400;
  await app.listen(port);

  let url = await app.getUrl();
  url = url.replace("[::1]", "localhost");
  Logger.log(`Documentation is running on: ${url}/api`, "Documentation");
}
bootstrap();
