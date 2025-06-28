import { Test, TestingModule } from "@nestjs/testing";
import { GetDonationService } from "./get-donation.service";
import { PrismaService } from "../../database/prisma.service";
import { NotFoundException, BadRequestException } from "@nestjs/common";

describe("GetDonationService", () => {
  let service: GetDonationService;
  let prisma: { donation: { findUnique: jest.Mock; findMany: jest.Mock } };

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
        findUnique: jest.fn(),
        findMany: jest.fn(),
      },
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetDonationService, { provide: PrismaService, useValue: prisma }],
    }).compile();
    service = module.get<GetDonationService>(GetDonationService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("deve retornar doação por ID com sucesso", async () => {
    prisma.donation.findUnique.mockResolvedValue(mockDonation);
    const result = await service.getDonationById("donation-id");
    expect(result).toEqual(mockDonation);
    expect(prisma.donation.findUnique).toHaveBeenCalledWith({ where: { id: "donation-id" } });
  });

  it("deve lançar NotFoundException se doação não encontrada por ID", async () => {
    prisma.donation.findUnique.mockResolvedValue(null);
    await expect(service.getDonationById("donation-id")).rejects.toThrow(NotFoundException);
  });

  it("deve lançar BadRequestException se o Prisma lançar erro em getDonationById", async () => {
    prisma.donation.findUnique.mockRejectedValue(new Error("fail"));
    await expect(service.getDonationById("donation-id")).rejects.toThrow(BadRequestException);
  });

  it("deve retornar lista de doações com sucesso", async () => {
    prisma.donation.findMany.mockResolvedValue([mockDonation]);
    const result = await service.getAllDonations();
    expect(result).toEqual([mockDonation]);
    expect(prisma.donation.findMany).toHaveBeenCalled();
  });

  it("deve lançar BadRequestException se o Prisma lançar erro em getAllDonations", async () => {
    prisma.donation.findMany.mockRejectedValue(new Error("fail"));
    await expect(service.getAllDonations()).rejects.toThrow(BadRequestException);
  });
});
