import { Test, TestingModule } from "@nestjs/testing";
import { UpdateDonationService } from "./update-donation.service";
import { PrismaService } from "../../database/prisma.service";
import { NotFoundException, BadRequestException } from "@nestjs/common";

describe("UpdateDonationService", () => {
  let service: UpdateDonationService;
  let prisma: { donation: { update: jest.Mock } };

  const mockDonation = {
    id: "donation-id",
    value: 200,
    userId: "user-id",
    createdAt: new Date(),
    updatedAt: new Date(),
    // ...outros campos relevantes
  };

  beforeEach(async () => {
    prisma = {
      donation: {
        update: jest.fn(),
      },
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [UpdateDonationService, { provide: PrismaService, useValue: prisma }],
    }).compile();
    service = module.get<UpdateDonationService>(UpdateDonationService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("deve atualizar doação com sucesso", async () => {
    prisma.donation.update.mockResolvedValue(mockDonation);
    const dto: { value: number } = { value: 200 };
    const result = await service.updateDonation("donation-id", dto);
    expect(result).toEqual(mockDonation);
    expect(prisma.donation.update).toHaveBeenCalledWith({ where: { id: "donation-id" }, data: dto });
  });

  it("deve lançar NotFoundException se doação não encontrada ao atualizar", async () => {
    prisma.donation.update.mockResolvedValue(null);
    const dto: { value: number } = { value: 200 };
    await expect(service.updateDonation("donation-id", dto)).rejects.toThrow(NotFoundException);
  });

  it("deve lançar BadRequestException se o Prisma lançar erro ao atualizar", async () => {
    prisma.donation.update.mockRejectedValue(new Error("fail"));
    const dto: { value: number } = { value: 200 };
    await expect(service.updateDonation("donation-id", dto)).rejects.toThrow(BadRequestException);
  });
});
