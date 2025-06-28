import { Test, TestingModule } from "@nestjs/testing";
import { CreateDonationService } from "./create-donation.service";
import { PrismaService } from "../../database/prisma.service";
import { BadRequestException } from "@nestjs/common";

describe("CreateDonationService", () => {
  let service: CreateDonationService;
  let prisma: { donation: { create: jest.Mock } };

  const mockDonation = {
    id: "donation-id",
    value: 100,
    userId: "user-id",
    createdAt: new Date(),
    updatedAt: new Date(),
    // ...outros campos relevantes
  };

  beforeEach(async () => {
    prisma = {
      donation: {
        create: jest.fn(),
      },
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateDonationService, { provide: PrismaService, useValue: prisma }],
    }).compile();
    service = module.get<CreateDonationService>(CreateDonationService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("deve criar doação com sucesso", async () => {
    prisma.donation.create.mockResolvedValue(mockDonation);
    const dto: { value: number; userId: string } = { value: 100, userId: "user-id" };
    const result = await service.createDonation(dto);
    expect(result).toEqual(mockDonation);
    expect(prisma.donation.create).toHaveBeenCalledWith({ data: dto });
  });

  it("deve lançar BadRequestException se o Prisma lançar erro", async () => {
    prisma.donation.create.mockRejectedValue(new Error("fail"));
    const dto: { value: number; userId: string } = { value: 100, userId: "user-id" };
    await expect(service.createDonation(dto)).rejects.toThrow(BadRequestException);
  });
});
