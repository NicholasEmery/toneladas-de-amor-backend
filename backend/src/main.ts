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
    swaggerOptions: {
      persistAuthorization: true,
      filter: true,
      showExtensions: true,
      showCommonExtensions: true,
      initOAuth: {},
    },
    customJs: [
      "https://cdn.jsdelivr.net/npm/swagger-ui-standalone-preset@3.52.5/swagger-ui-standalone-preset.js",
      "https://cdn.jsdelivr.net/npm/swagger-ui-dist@3.52.5/swagger-ui-bundle.js",
    ],
  };
  SwaggerModule.setup("api", app, documentFactory, customOptions);

  await app.listen(process.env.PORT || 3001, "localhost");

  let url = await app.getUrl();
  url = url.replace("[::1]", "localhost");
  Logger.log(`Documentation is running on: ${url}/api`, "Documentation");
}
bootstrap();
