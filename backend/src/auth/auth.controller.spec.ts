import { Test, TestingModule } from "@nestjs/testing";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { SignInDto } from "./dto/signIn.dto";

describe("AuthController", () => {
  let controller: AuthController;
  let service: AuthService;

  const mockAuthService = {
    signin: jest.fn().mockResolvedValue({
      message: "Usuário autenticado com sucesso.",
      role: "DONATOR",
      name: "Test User",
      access_token: "access-token",
      refresh_token: "refresh-token",
      statusCode: 200,
    }),
    refreshToken: jest.fn().mockResolvedValue({
      message: "Token atualizado com sucesso.",
      access_token: "new-access-token",
      refresh_token: "new-refresh-token",
      statusCode: 200,
    }),
    logout: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
    jest.clearAllMocks();
  });

  it("deve autenticar usuário com sucesso", async () => {
    const dto: SignInDto = { email: "test@example.com", password: "123456" };
    const result = await controller.signin(dto);
    expect(result.message).toBe("Usuário autenticado com sucesso.");
    expect(result.statusCode).toBe(200);
    expect(service.signin).toHaveBeenCalledWith(dto);
  });

  it("deve atualizar o token com sucesso", async () => {
    const authHeader = "Bearer refresh-token";
    const result = await controller.refreshToken(authHeader);
    expect(result.message).toBe("Token atualizado com sucesso.");
    expect(result.statusCode).toBe(200);
    expect(service.refreshToken).toHaveBeenCalledWith("refresh-token");
  });

  it("deve fazer logout com sucesso", async () => {
    const authHeader = "Bearer access-token";
    const result = await controller.logout(authHeader);
    expect(result.message).toBe("Usuário deslogado com sucesso.");
    expect(result.statusCode).toBe(200);
    expect(service.logout).toHaveBeenCalledWith("access-token");
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
