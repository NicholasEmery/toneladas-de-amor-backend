import { Test, TestingModule } from "@nestjs/testing";
import { UpdateUserService } from "./update-user.service";
import { PrismaService } from "../../database/prisma.service";
import { NotFoundException, BadRequestException } from "@nestjs/common";
import { Role, User } from "@prisma/client";
import { UpdateUserUpheldDto } from "../dto/updateUser/updateUserUpheld.dto";

describe("UpdateUserService", () => {
  let service: UpdateUserService;
  let prisma: { user: { update: jest.Mock } };

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
        update: jest.fn(),
      },
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [UpdateUserService, { provide: PrismaService, useValue: prisma }],
    }).compile();
    service = module.get<UpdateUserService>(UpdateUserService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("deve atualizar usuário UPHELD com sucesso", async () => {
    prisma.user.update.mockResolvedValue(mockUser);
    const dto = {
      fieldsRole: {
        employmentSituation: "Desempregado",
        numberOfPeopleInTheHousehold: 1,
        cpf: "12345678901",
        address: {
          street: "Rua Exemplo",
          number: "123",
          complement: "",
          neighborhood: "Bairro",
          city: "Cidade",
          state: "Estado",
          zipCode: "12345678",
        },
      },
    };
    const result = await service.updateUserUpheld("user-id", dto as UpdateUserUpheldDto);
    expect(result).toEqual(mockUser);
    expect(prisma.user.update).toHaveBeenCalledWith({
      where: { id: "user-id" },
      data: { fieldsRole: expect.any(Object) },
    });
  });

  it("deve lançar NotFoundException se usuário não encontrado ao atualizar UPHELD", async () => {
    prisma.user.update.mockResolvedValue(null);
    const dto = { fieldsRole: {} };
    await expect(service.updateUserUpheld("user-id", dto as UpdateUserUpheldDto)).rejects.toThrow(NotFoundException);
  });

  it("deve lançar BadRequestException se o Prisma lançar erro ao atualizar UPHELD", async () => {
    prisma.user.update.mockRejectedValue(new Error("fail"));
    const dto = { fieldsRole: {} };
    await expect(service.updateUserUpheld("user-id", dto as UpdateUserUpheldDto)).rejects.toThrow(BadRequestException);
  });

  // Você pode expandir para updateUserDonator, updateUserColaborator, updateUserAdmin
});
