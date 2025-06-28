import { NotFoundException } from "@nestjs/common";
import { Response } from "express";
import { Test, TestingModule } from "@nestjs/testing";
import { EmailResetPasswordController } from "./email-reset-password.controller";
import { EmailResetPasswordService } from "./email-reset-password.service";
import { PrismaService } from "../../database/prisma.service";
import { JwtService } from "@nestjs/jwt";

describe("EmailResetPasswordController", () => {
  let controller: EmailResetPasswordController;

  const mockService = {
    sendEmail: jest.fn(),
    verifyToken: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmailResetPasswordController],
      providers: [
        { provide: EmailResetPasswordService, useValue: mockService },
        { provide: PrismaService, useValue: {} },
        { provide: JwtService, useValue: {} },
      ],
    }).compile();

    controller = module.get<EmailResetPasswordController>(EmailResetPasswordController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("deve enviar email de reset de senha com sucesso", async () => {
    mockService.sendEmail.mockResolvedValueOnce({
      resetPasswordToken: "token",
    });
    const res = { cookie: jest.fn() } as Partial<Response>;
    const dto = { email: "a@a.com" };
    const result = await controller.sendEmail(dto, res as unknown as Response);
    expect(res.cookie).toHaveBeenCalledWith(
      "resetPasswordToken",
      "token",
      expect.objectContaining({ httpOnly: true, sameSite: "none" }),
    );
    expect(result.success).toBe("Email enviado com sucesso.");
    expect(result.statusCode).toBe(200);
    expect(mockService.sendEmail).toHaveBeenCalledWith("a@a.com");
  });

  it("deve lançar NotFoundException se email não existir", async () => {
    mockService.sendEmail.mockRejectedValueOnce(new NotFoundException("Usuário não encontrado"));
    const res = { cookie: jest.fn() } as Partial<Response>;
    const dto = { email: "notfound@a.com" };
    await expect(controller.sendEmail(dto, res as unknown as Response)).rejects.toThrow(NotFoundException);
  });

  it("deve verificar token e alterar senha com sucesso", async () => {
    mockService.verifyToken.mockResolvedValueOnce(undefined);
    const dto = { token: "token", password: "novaSenha" };
    const result = await controller.verifyToken(dto);
    expect(result.success).toBe("Senha alterada com sucesso.");
    expect(result.statusCode).toBe(200);
    expect(mockService.verifyToken).toHaveBeenCalledWith("token", "novaSenha");
  });

  it("deve lançar NotFoundException se token for inválido", async () => {
    mockService.verifyToken.mockRejectedValueOnce(new NotFoundException("Usuário não encontrado"));
    const dto = { token: "token-invalido", password: "novaSenha" };
    await expect(controller.verifyToken(dto)).rejects.toThrow(NotFoundException);
  });
});
