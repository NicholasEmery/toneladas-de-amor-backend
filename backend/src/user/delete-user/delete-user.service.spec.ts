import { Test, TestingModule } from "@nestjs/testing";
import { DeleteUserService } from "./delete-user.service";
import { PrismaService } from "../../database/prisma.service";
import { NotFoundException, BadRequestException } from "@nestjs/common";

describe("DeleteUserService", () => {
  let service: DeleteUserService;

  const mockPrisma = {
    user: {
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteUserService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<DeleteUserService>(DeleteUserService);
    jest.clearAllMocks();
  });

  it("deve deletar usuário com sucesso", async () => {
    mockPrisma.user.delete.mockResolvedValueOnce(undefined);
    await expect(service.deleteUser("user-id")).resolves.toBeUndefined();
    expect(mockPrisma.user.delete).toHaveBeenCalledWith({
      where: { id: "user-id" },
    });
  });

  it("deve lançar NotFoundException se usuário não for encontrado", async () => {
    const notFoundError = new Error("User not found");
    notFoundError.name = "NotFoundError";
    mockPrisma.user.delete.mockRejectedValueOnce(notFoundError);
    await expect(service.deleteUser("user-id")).rejects.toThrow(
      NotFoundException,
    );
  });

  it("deve lançar BadRequestException para outros erros", async () => {
    const genericError = new Error("Erro genérico");
    mockPrisma.user.delete.mockRejectedValueOnce(genericError);
    await expect(service.deleteUser("user-id")).rejects.toThrow(
      BadRequestException,
    );
  });
});
