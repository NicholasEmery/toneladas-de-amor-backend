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
  });

  it("deve criar usuário UPHELD", async () => {
    const dto = {
      name: "User",
      email: "a@a.com",
      password: "123",
      phone: "11999999999",
      role: Role.UPHELD,
    };
    const result = await controller.createUserUpheld(dto as any);
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
    };
    const result = await controller.createUserDonator(dto as any);
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
    };
    const result = await controller.createUserColaborator(
      dto as any,
      "Bearer token",
    );
    expect(result.success).toBe("Usuário criado com sucesso.");
    expect(result.accessToken).toBe(mockTokens.accessToken);
    expect(result.refreshToken).toBe(mockTokens.refreshToken);
    expect(result.statusCode).toBe(201);
    expect(service.createUserColaborator).toHaveBeenCalledWith(
      dto,
      "Bearer token",
    );
  });

  it("deve criar usuário ADMIN", async () => {
    const dto = {
      name: "User",
      email: "a@a.com",
      password: "123",
      phone: "11999999999",
      role: Role.ADMIN,
    };
    const result = await controller.createUserAdmin(dto as any);
    expect(result.success).toBe("Usuário criado com sucesso.");
    expect(result.accessToken).toBe(mockTokens.accessToken);
    expect(result.refreshToken).toBe(mockTokens.refreshToken);
    expect(result.statusCode).toBe(201);
    expect(service.createUserAdmin).toHaveBeenCalledWith(dto);
  });
});
