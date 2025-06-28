import { Test, TestingModule } from "@nestjs/testing";
import { GetUserService } from "./get-user.service";
import { PrismaService } from "../../database/prisma.service";
import { NotFoundException, BadRequestException } from "@nestjs/common";
import { Role, User } from "@prisma/client";

describe("GetUserService", () => {
  let service: GetUserService;
  let prisma: { user: { findUnique: jest.Mock; findMany: jest.Mock } };

  const mockUser: User = {
    id: "user-id",
    name: "Test User",
    email: "test@example.com",
    password: "hashed",
    phone: "11999999999",
    role: Role.DONATOR,
    fieldsRole: {},
    emailVerified: true,
    otp: null,
    expiresOtpAt: null,
    tokenVersion: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    prisma = {
      user: {
        findUnique: jest.fn(),
        findMany: jest.fn(),
      },
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetUserService, { provide: PrismaService, useValue: prisma }],
    }).compile();
    service = module.get<GetUserService>(GetUserService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("deve retornar usuário por ID com sucesso", async () => {
    prisma.user.findUnique.mockResolvedValue(mockUser);
    const result = await service.getUserById("user-id");
    expect(result).toEqual(mockUser);
    expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { id: "user-id" } });
  });

  it("deve lançar NotFoundException se usuário não encontrado por ID", async () => {
    prisma.user.findUnique.mockResolvedValue(null);
    await expect(service.getUserById("user-id")).rejects.toThrow(NotFoundException);
  });

  it("deve lançar erro genérico se o Prisma lançar erro em getUserById", async () => {
    prisma.user.findUnique.mockRejectedValue(new Error("fail"));
    await expect(service.getUserById("user-id")).rejects.toThrow("Error fetching user by ID");
  });

  it("deve retornar usuário por email com sucesso", async () => {
    prisma.user.findUnique.mockResolvedValue(mockUser);
    const result = await service.getUserByEmail("test@example.com");
    expect(result).toEqual(mockUser);
    expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { email: "test@example.com" } });
  });

  it("deve lançar NotFoundException se usuário não encontrado por email", async () => {
    prisma.user.findUnique.mockResolvedValue(null);
    await expect(service.getUserByEmail("test@example.com")).rejects.toThrow(NotFoundException);
  });

  it("deve lançar BadRequestException se o Prisma lançar erro em getUserByEmail", async () => {
    prisma.user.findUnique.mockRejectedValue(new Error("fail"));
    await expect(service.getUserByEmail("test@example.com")).rejects.toThrow(BadRequestException);
  });

  it("deve retornar usuário por telefone com sucesso", async () => {
    prisma.user.findUnique.mockResolvedValue(mockUser);
    const result = await service.getUserByPhone("11999999999");
    expect(result).toEqual(mockUser);
    expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { phone: "11999999999" } });
  });

  it("deve lançar NotFoundException se usuário não encontrado por telefone", async () => {
    prisma.user.findUnique.mockResolvedValue(null);
    await expect(service.getUserByPhone("11999999999")).rejects.toThrow(NotFoundException);
  });

  it("deve lançar BadRequestException se o Prisma lançar erro em getUserByPhone", async () => {
    prisma.user.findUnique.mockRejectedValue(new Error("fail"));
    await expect(service.getUserByPhone("11999999999")).rejects.toThrow(BadRequestException);
  });
});
