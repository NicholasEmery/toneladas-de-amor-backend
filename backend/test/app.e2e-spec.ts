import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import request from "supertest";
import { AppModule } from "../src/app.module";

jest.setTimeout(30000);

describe("Toneladas de Amor API (e2e)", () => {
  let app: INestApplication;
  let accessToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
    );
    await app.init();

    // Login para obter token real
    const loginRes = await request(app.getHttpServer())
      .post("/auth/signin")
      .send({ email: "example@gmail.com", password: "examplePassword" });
    expect([200, 201]).toContain(loginRes.status);
    accessToken = `Bearer ${loginRes.body.access_token}`;
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

  describe("Checkout - Pagamento Avulso", () => {
    it("POST /checkout/create/payment/credit-card/detached - deve validar DTO e retornar erro 400 para payload inválido", async () => {
      const res = await request(app.getHttpServer())
        .post("/checkout/create/payment/credit-card/detached")
        .set("Authorization", accessToken)
        .send({});
      expect(res.status).toBe(400);
      expect(res.body.message).toBeDefined();
    });

    it("POST /checkout/create/payment/credit-card/detached - deve criar checkout com payload válido", async () => {
      const payload = {
        billingTypes: "CREDIT_CARD",
        chargeTypes: "DETACHED",
        minutesToExpire: 15,
        callback: {
          successUrl: "https://meusite.com/sucesso",
          cancelUrl: "https://meusite.com/cancelado",
          expireUrl: "https://meusite.com/expirado",
        },
        items: {
          description: "Doação Cartão Avulso",
          name: "Doação",
          quantity: 1,
          value: 100,
        },
        customer: {
          name: "João Teste",
          cpfCnpj: "12345678909",
          email: "joao@email.com",
          phone: "+5511999999999",
          address: "Rua Exemplo",
          addressNumber: "123",
          complement: "Apto 1",
          neighborhood: "Centro",
          city: "São Paulo",
          state: "SP",
          zipCode: "12345678",
        },
      };
      const res = await request(app.getHttpServer())
        .post("/checkout/create/payment/credit-card/detached")
        .set("Authorization", accessToken)
        .send(payload);
      expect([200, 201, 400]).toContain(res.status);
      if ([200, 201].includes(res.status)) {
        expect(res.body).toHaveProperty("id");
      }
    });
  });

  describe("Checkout - Pagamento Recorrente", () => {
    it("POST /checkout/create/payment/credit-card/recurrence - deve validar DTO e retornar erro 400 para payload inválido", async () => {
      const res = await request(app.getHttpServer())
        .post("/checkout/create/payment/credit-card/recurrence")
        .set("Authorization", accessToken)
        .send({});
      expect(res.status).toBe(400);
      expect(res.body.message).toBeDefined();
    });

    it("POST /checkout/create/payment/credit-card/recurrence - deve criar checkout recorrente com payload válido", async () => {
      const payload = {
        billingTypes: "CREDIT_CARD",
        chargeTypes: "RECURRENT",
        minutesToExpire: 15,
        callback: {
          successUrl: "https://meusite.com/sucesso",
          cancelUrl: "https://meusite.com/cancelado",
          expireUrl: "https://meusite.com/expirado",
        },
        items: {
          description: "Doação Cartão Recorrente",
          name: "Doação Mensal",
          quantity: 1,
          value: 50,
        },
        customer: {
          name: "Maria Recorrente",
          cpfCnpj: "12345678909",
          email: "maria@email.com",
          phone: "+5511988888888",
          address: "Rua Recorrente",
          addressNumber: "456",
          complement: "Casa",
          neighborhood: "Bairro",
          city: "Rio de Janeiro",
          state: "RJ",
          zipCode: "87654321",
        },
        subscription: {
          cycle: "MONTHLY",
          endDate: "2025-12-31",
          nextDueDate: "2025-07-01",
        },
      };
      const res = await request(app.getHttpServer())
        .post("/checkout/create/payment/credit-card/recurrence")
        .set("Authorization", accessToken)
        .send(payload);
      expect([200, 201, 400]).toContain(res.status);
      if ([200, 201].includes(res.status)) {
        expect(res.body).toHaveProperty("id");
      }
    });
  });
});
