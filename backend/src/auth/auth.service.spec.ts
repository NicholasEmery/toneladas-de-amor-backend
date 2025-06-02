import { Test, TestingModule } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { PrismaService } from "../database/prisma.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import {
  UnauthorizedException,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";

describe("AuthService", () => {
  let service: AuthService;
  let prisma: PrismaService;

  const mockUser = {
    id: "user-id",
    name: "Test User",
    email: "test@example.com",
    password: "hashed",
    phone: "11999999999",
    role: "DONATOR",
    fieldsRole: {},
    emailVerified: true,
    otp: null,
    expiresOtpAt: null,
    tokenVersion: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockPrisma = {
    user: {
      findUnique: jest.fn(),
      update: jest.fn(),
    },
  };

  const mockJwtService = {
    signAsync: jest.fn().mockResolvedValue("jwt-token"),
    verify: jest.fn().mockReturnValue({ sub: "user-id", version: 0 }),
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: mockPrisma },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it("deve autenticar usuário com sucesso", async () => {
    mockPrisma.user.findUnique.mockResolvedValueOnce(mockUser);
    const bcryptCompareSpy = jest
      .spyOn(bcrypt, "compare")
      .mockImplementation(() => Promise.resolve(true));
    const result = await service.signin({
      email: mockUser.email,
      password: "123456",
    });
    expect(result.access_token).toBe("jwt-token");
    expect(result.refresh_token).toBe("jwt-token");
    expect(result.role).toBe("DONATOR");
    expect(result.name).toBe("Test User");
    bcryptCompareSpy.mockRestore();
  });

  it("deve lançar NotFoundException se usuário não existir", async () => {
    mockPrisma.user.findUnique.mockResolvedValueOnce(null);
    await expect(
      service.signin({ email: "notfound@example.com", password: "123456" }),
    ).rejects.toThrow(NotFoundException);
  });

  it("deve lançar UnauthorizedException se senha for inválida", async () => {
    mockPrisma.user.findUnique.mockResolvedValueOnce(mockUser);
    const bcryptCompareSpy = jest
      .spyOn(bcrypt, "compare")
      .mockImplementation(() => Promise.resolve(false));
    await expect(
      service.signin({ email: mockUser.email, password: "wrong" }),
    ).rejects.toThrow(UnauthorizedException);
    bcryptCompareSpy.mockRestore();
  });

  it("deve lançar UnauthorizedException se email não verificado", async () => {
    mockPrisma.user.findUnique.mockResolvedValueOnce({
      ...mockUser,
      emailVerified: false,
    });
    const bcryptCompareSpy = jest
      .spyOn(bcrypt, "compare")
      .mockImplementation(() => Promise.resolve(true));
    await expect(
      service.signin({ email: mockUser.email, password: "123456" }),
    ).rejects.toThrow(UnauthorizedException);
    bcryptCompareSpy.mockRestore();
  });

  it("deve atualizar token com sucesso", async () => {
    mockPrisma.user.findUnique.mockResolvedValueOnce(mockUser);
    mockPrisma.user.update.mockResolvedValueOnce({
      ...mockUser,
      tokenVersion: 1,
    });
    const result = await service.refreshToken("refresh-token");
    expect(result.accessToken).toBe("jwt-token");
    expect(result.refreshToken).toBe("jwt-token");
    expect(prisma.user.update).toHaveBeenCalled();
  });

  it("deve lançar UnauthorizedException ao atualizar token se usuário não existir", async () => {
    mockPrisma.user.findUnique.mockResolvedValueOnce(null);
    await expect(service.refreshToken("refresh-token")).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it("deve lançar BadRequestException ao atualizar token se erro genérico", async () => {
    mockJwtService.verify.mockImplementationOnce(() => {
      throw new Error("fail");
    });
    await expect(service.refreshToken("refresh-token")).rejects.toThrow(
      BadRequestException,
    );
  });

  it("deve fazer logout com sucesso", async () => {
    mockJwtService.verify.mockReturnValueOnce({ sub: "user-id", version: 0 });
    mockPrisma.user.update.mockResolvedValueOnce({
      ...mockUser,
      tokenVersion: 1,
    });
    await expect(service.logout("access-token")).resolves.toBeUndefined();
    expect(prisma.user.update).toHaveBeenCalled();
  });

  it("deve lançar UnauthorizedException ao fazer logout com token inválido", async () => {
    mockJwtService.verify.mockImplementationOnce(() => {
      throw new Error("fail");
    });
    await expect(service.logout("access-token")).rejects.toThrow(
      UnauthorizedException,
    );
  });
});
