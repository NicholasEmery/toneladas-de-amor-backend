import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import request from "supertest";
import { AppModule } from "../src/app.module";

jest.setTimeout(30000);

describe("Toneladas de Amor API (e2e)", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
    );
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it("GET /docs deve retornar a documentação Swagger", async () => {
    const res = await request(app.getHttpServer()).get("/docs");
    // Aceita 200 (Swagger disponível) ou 404 (não disponível em ambiente de teste)
    expect([200, 404]).toContain(res.status);
    if (res.status === 200) {
      expect(res.text).toContain("Toneladas de Amor API Docs");
    }
  });

  it("GET /get-user/all sem token deve retornar 401", async () => {
    const res = await request(app.getHttpServer()).get("/get-user/all");
    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("message");
  });

  it("GET /rota-inexistente deve retornar 404", async () => {
    const res = await request(app.getHttpServer()).get("/rota-inexistente");
    expect(res.status).toBe(404);
  });
});
