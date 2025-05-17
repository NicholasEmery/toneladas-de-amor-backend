import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Logger } from "@nestjs/common";
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
  SwaggerModule.setup("docs", app, documentFactory, customOptions);

  const port = process.env.PORT;

  if (!port) {
    throw new Error("PORT environment variable is not set");
  }

  await app.listen(port, "0.0.0.0");

  const url = await app.getUrl();
  Logger.log(`Documentation is running on: ${url}/api`, "Documentation");
}
bootstrap();
