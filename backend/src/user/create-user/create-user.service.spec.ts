import { Test, TestingModule } from "@nestjs/testing";
import { CreateUserService } from "./create-user.service";
import { PrismaService } from "../../database/prisma.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { BadRequestException } from "@nestjs/common";
import { Role } from "@prisma/client";
import { CreateUserUpheldDto } from "../dto/createUser/createUserUpheld.dto";

jest.mock("bcrypt");

describe("CreateUserService", () => {
  let service: CreateUserService;
  let prisma: { user: { findUnique: jest.Mock; create: jest.Mock } };
  let jwtService: { signAsync: jest.Mock };

  const mockUser = {
    id: "user-id",
    name: "User",
    email: "a@a.com",
    password: "hashed",
    phone: "11999999999",
    role: "UPHELD",
    fieldsRole: {},
    tokenVersion: 1,
  };

  beforeEach(async () => {
    prisma = {
      user: {
        findUnique: jest.fn(),
        create: jest.fn(),
      },
    };
    jwtService = {
      signAsync: jest.fn().mockResolvedValue("token"),
    };
    (bcrypt.hash as jest.Mock).mockResolvedValue("hashed");
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserService,
        { provide: PrismaService, useValue: prisma },
        { provide: JwtService, useValue: jwtService },
      ],
    }).compile();
    service = module.get<CreateUserService>(CreateUserService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("deve criar usuário UPHELD com sucesso", async () => {
    prisma.user.findUnique.mockResolvedValue(null);
    prisma.user.create.mockResolvedValue(mockUser);
    const dto = {
      name: "User",
      email: "a@a.com",
      password: "123456",
      phone: "83991238499",
      role: Role.UPHELD,
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
    const result = await service.createUserUpheld(dto as CreateUserUpheldDto);
    expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { email: dto.email } });
    expect(prisma.user.create).toHaveBeenCalled();
    expect(result.accessToken).toBe("token");
    expect(result.refreshToken).toBe("token");
  });

  it("deve lançar BadRequestException se usuário já existe", async () => {
    prisma.user.findUnique.mockResolvedValue(mockUser);
    const dto = {
      name: "User",
      email: "a@a.com",
      password: "123456",
      phone: "83991238499",
      role: Role.UPHELD,
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
    await expect(service.createUserUpheld(dto as CreateUserUpheldDto)).rejects.toThrow(BadRequestException);
  });

  it("deve lançar erro se o Prisma lançar erro", async () => {
    prisma.user.findUnique.mockResolvedValue(null);
    prisma.user.create.mockRejectedValue(new Error("fail"));
    const dto = {
      name: "User",
      email: "a@a.com",
      password: "123456",
      phone: "83991238499",
      role: Role.UPHELD,
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
    await expect(service.createUserUpheld(dto as CreateUserUpheldDto)).rejects.toThrow();
  });

  // ...você pode expandir para outros métodos como createUserDonator, createUserColaborator, createUserAdmin
});
