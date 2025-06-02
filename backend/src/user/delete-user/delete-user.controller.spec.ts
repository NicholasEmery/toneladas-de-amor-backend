import { Test, TestingModule } from "@nestjs/testing";
import { DeleteUserController } from "./delete-user.controller";
import { DeleteUserService } from "./delete-user.service";

describe("DeleteUserController", () => {
  let controller: DeleteUserController;
  let service: DeleteUserService;

  const mockDeleteUserService = {
    deleteUser: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeleteUserController],
      providers: [
        { provide: DeleteUserService, useValue: mockDeleteUserService },
      ],
    }).compile();

    controller = module.get<DeleteUserController>(DeleteUserController);
    service = module.get<DeleteUserService>(DeleteUserService);
  });

  it("deve deletar usuário por ID", async () => {
    const dto = { userId: "user-id" };
    const result = await controller.deleteUser(dto as any);
    expect(result.success).toBe("Usuário deletado com sucesso.");
    expect(result.statusCode).toBe(200);
    expect(service.deleteUser).toHaveBeenCalledWith("user-id");
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
