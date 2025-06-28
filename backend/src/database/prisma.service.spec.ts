import { Test, TestingModule } from "@nestjs/testing";
import { PrismaService } from "../../database/prisma.service";

describe("PrismaService", () => {
  let service: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile();
    service = module.get<PrismaService>(PrismaService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("deve conectar e desconectar sem erros", async () => {
    // Simula os métodos do PrismaClient
    service.$connect = jest.fn().mockResolvedValue(undefined);
    service.$disconnect = jest.fn().mockResolvedValue(undefined);
    await expect(service.$connect()).resolves.toBeUndefined();
    await expect(service.$disconnect()).resolves.toBeUndefined();
  });

  it("deve lançar erro ao conectar se o Prisma falhar", async () => {
    service.$connect = jest.fn().mockRejectedValue(new Error("fail"));
    await expect(service.$connect()).rejects.toThrow("fail");
  });

  it("deve lançar erro ao desconectar se o Prisma falhar", async () => {
    service.$disconnect = jest.fn().mockRejectedValue(new Error("fail"));
    await expect(service.$disconnect()).rejects.toThrow("fail");
  });
});
