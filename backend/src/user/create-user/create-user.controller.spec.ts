import { Test, TestingModule } from "@nestjs/testing";
import { CreateUserController } from "./create-user.controller";
import { CreateUserService } from "./create-user.service";
import { Role } from "@prisma/client";

describe("CreateUserController", () => {
  let controller: CreateUserController;
  let service: CreateUserService;

  const mockTokens = {
    accessToken: "access-token",
    refreshToken: "refresh-token",
  };

  const mockCreateUserService = {
    createUserUpheld: jest.fn().mockResolvedValue(mockTokens),
    createUserDonator: jest.fn().mockResolvedValue(mockTokens),
    createUserColaborator: jest.fn().mockResolvedValue(mockTokens),
    createUserAdmin: jest.fn().mockResolvedValue(mockTokens),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateUserController],
      providers: [
        { provide: CreateUserService, useValue: mockCreateUserService },
      ],
    }).compile();

    controller = module.get<CreateUserController>(CreateUserController);
    service = module.get<CreateUserService>(CreateUserService);
    jest.clearAllMocks();
  });

  it("deve criar usuário UPHELD", async () => {
    const dto = {
      name: "User",
      email: "a@a.com",
      password: "123",
      phone: "11999999999",
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
    const result = await controller.createUserUpheld(dto);
    expect(result.success).toBe("Usuário criado com sucesso.");
    expect(result.accessToken).toBe(mockTokens.accessToken);
    expect(result.refreshToken).toBe(mockTokens.refreshToken);
    expect(result.statusCode).toBe(201);
    expect(service.createUserUpheld).toHaveBeenCalledWith(dto);
  });

  it("deve criar usuário DONATOR", async () => {
    const dto = {
      name: "User",
      email: "a@a.com",
      password: "123",
      phone: "11999999999",
      role: Role.DONATOR,
      fieldsRole: {
        nameBusiness: "Empresa Exemplo",
        cnpj: "12.345.678/0001-99",
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
    const result = await controller.createUserDonator(dto);
    expect(result.success).toBe("Usuário criado com sucesso.");
    expect(result.accessToken).toBe(mockTokens.accessToken);
    expect(result.refreshToken).toBe(mockTokens.refreshToken);
    expect(result.statusCode).toBe(201);
    expect(service.createUserDonator).toHaveBeenCalledWith(dto);
  });

  it("deve criar usuário COLABORATOR", async () => {
    const dto = {
      name: "User",
      email: "a@a.com",
      password: "123",
      phone: "11999999999",
      role: Role.CONTRIBUTOR,
      fieldsRole: {
        department: "Departamento Exemplo",
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
    const token = "token";
    const result = await controller.createUserColaborator(
      dto,
      `Bearer ${token}`,
    );
    expect(result.success).toBe("Usuário criado com sucesso.");
    expect(result.accessToken).toBe(mockTokens.accessToken);
    expect(result.refreshToken).toBe(mockTokens.refreshToken);
    expect(result.statusCode).toBe(201);
    expect(service.createUserColaborator).toHaveBeenCalledWith(dto, token);
  });

  it("deve criar usuário ADMIN", async () => {
    const dto = {
      name: "User",
      email: "a@a.com",
      password: "123",
      phone: "11999999999",
      role: Role.ADMIN,
      fieldsRole: {},
    };
    const result = await controller.createUserAdmin(dto);
    expect(result.success).toBe("Usuário criado com sucesso.");
    expect(result.accessToken).toBe(mockTokens.accessToken);
    expect(result.refreshToken).toBe(mockTokens.refreshToken);
    expect(result.statusCode).toBe(201);
    expect(service.createUserAdmin).toHaveBeenCalledWith(dto);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
