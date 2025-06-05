import { Test, TestingModule } from "@nestjs/testing";
import { GetUserController } from "./get-user.controller";
import { GetUserService } from "./get-user.service";
import { AuthGuard } from "../../auth/auth.guard";
import { RolesGuard } from "../../auth/roles.guard";
import { Role, User } from "@prisma/client";

type GetUserByIdTokenReturn = {
  success: string;
  user: User;
  statusCode: number;
};
type GetAllUsersReturn = {
  success: string;
  users: User[];
  statusCode: number;
};
type GetUserReturn = {
  success: string;
  user: User;
  statusCode: number;
};
type GetUsersByRoleReturn = {
  success: string;
  users: User[];
  statusCode: number;
};

describe("GetUserController", () => {
  let controller: GetUserController;
  let service: GetUserService;

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

  const mockGetUserService = {
    getUserById: jest.fn().mockResolvedValue(mockUser),
    getAllUsers: jest.fn().mockResolvedValue([mockUser]),
    getUserByEmail: jest.fn().mockResolvedValue(mockUser),
    getUserByPhone: jest.fn().mockResolvedValue(mockUser),
    getUserByName: jest.fn().mockResolvedValue(mockUser),
    getUserByRole: jest.fn().mockResolvedValue([mockUser]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetUserController],
      providers: [{ provide: GetUserService, useValue: mockGetUserService }],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: () => true })
      .overrideGuard(RolesGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<GetUserController>(GetUserController);
    service = module.get<GetUserService>(GetUserService);
  });

  it("deve buscar usuário por ID do token", async () => {
    const req = { user: { id: "user-id" } } as { user: { id: string } };

    const result = (await controller.getUserByIdToken(
      req,
    )) as GetUserByIdTokenReturn;
    expect(result.success).toBe("Usuário encontrado com sucesso.");
    expect(result.user).toEqual(mockUser);
    expect(result.statusCode).toBe(200);
    expect(service.getUserById).toHaveBeenCalledWith("user-id");
  });

  it("deve buscar todos os usuários", async () => {
    const result = (await controller.getAllUsers()) as GetAllUsersReturn;
    expect(result.success).toBe("Usuários encontrados com sucesso.");
    expect(result.users).toEqual([mockUser]);
    expect(result.statusCode).toBe(200);
    expect(service.getAllUsers).toHaveBeenCalled();
  });

  it("deve buscar usuário por email", async () => {
    const dto = { email: "test@example.com" };
    const result = (await controller.getUserByEmail(dto)) as GetUserReturn;
    expect(result.success).toBe("Usuário encontrado com sucesso.");
    expect(result.user).toEqual(mockUser);
    expect(result.statusCode).toBe(200);
    expect(service.getUserByEmail).toHaveBeenCalledWith("test@example.com");
  });

  it("deve buscar usuário por telefone", async () => {
    const dto = { phone: "11999999999" };
    const result = (await controller.getUserByPhone(dto)) as GetUserReturn;
    expect(result.success).toBe("Usuário encontrado com sucesso.");
    expect(result.user).toEqual(mockUser);
    expect(result.statusCode).toBe(200);
    expect(service.getUserByPhone).toHaveBeenCalledWith("11999999999");
  });

  it("deve buscar usuário por nome", async () => {
    const dto = { name: "Test User" };
    const result = (await controller.getUserByName(dto)) as GetUserReturn;
    expect(result.success).toBe("Usuário encontrado com sucesso.");
    expect(result.user).toEqual(mockUser);
    expect(result.statusCode).toBe(200);
    expect(service.getUserByName).toHaveBeenCalledWith("Test User");
  });

  it("deve buscar usuários por role", async () => {
    const dto = { role: Role.DONATOR };
    const result = (await controller.getUserByRole(
      dto,
    )) as GetUsersByRoleReturn;
    expect(result.success).toContain("Usuários com role:");
    expect(result.users).toEqual([mockUser]);
    expect(result.statusCode).toBe(200);
    expect(service.getUserByRole).toHaveBeenCalledWith(Role.DONATOR);
  });

  it("deve buscar usuário por userId", async () => {
    const dto = { userId: "user-id" };
    const result = (await controller.getUserById(dto)) as GetUserReturn;
    expect(result.success).toBe("Usuário encontrado com sucesso.");
    expect(result.user).toEqual(mockUser);
    expect(result.statusCode).toBe(200);
    expect(service.getUserById).toHaveBeenCalledWith("user-id");
  });

  it("deve buscar usuário por id", async () => {
    const result = (await controller.getUser("user-id")) as GetUserReturn;
    expect(result.success).toBe("Usuário encontrado com sucesso.");
    expect(result.user).toEqual(mockUser);
    expect(result.statusCode).toBe(200);
    expect(service.getUserById).toHaveBeenCalledWith("user-id");
  });
});
