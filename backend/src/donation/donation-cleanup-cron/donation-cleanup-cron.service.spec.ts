import { Test, TestingModule } from "@nestjs/testing";
import { DonationCleanupCronService } from "./donation-cleanup-cron.service";
import { PrismaService } from "src/database/prisma.service";

describe("DonationCleanupCronService", () => {
  let service: DonationCleanupCronService;
  let prisma: { donation: { findMany: jest.Mock; deleteMany: jest.Mock } };

  beforeEach(async () => {
    prisma = {
      donation: {
        findMany: jest.fn(),
        deleteMany: jest.fn(),
      },
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [DonationCleanupCronService, { provide: PrismaService, useValue: prisma }],
    }).compile();
    service = module.get<DonationCleanupCronService>(DonationCleanupCronService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("deve remover doações recorrentes expiradas", async () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const today = new Date();
    prisma.donation.findMany.mockResolvedValue([
      { id: "1", isRecurring: { dateFinalized: yesterday.toISOString() } },
      { id: "2", isRecurring: { dateFinalized: today.toISOString() } },
      { id: "3", isRecurring: { dateFinalized: undefined } },
      { id: "4", isRecurring: null },
    ]);
    prisma.donation.deleteMany.mockResolvedValue({ count: 1 });
    await service.deleteExpiredDonations();
    expect(prisma.donation.deleteMany).toHaveBeenCalledWith({ where: { id: { in: ["1"] } } });
  });

  it("não deve remover nada se não houver doações expiradas", async () => {
    const today = new Date();
    prisma.donation.findMany.mockResolvedValue([
      { id: "2", isRecurring: { dateFinalized: today.toISOString() } },
      { id: "3", isRecurring: { dateFinalized: undefined } },
      { id: "4", isRecurring: null },
    ]);
    await service.deleteExpiredDonations();
    expect(prisma.donation.deleteMany).not.toHaveBeenCalled();
  });

  it("deve lidar com erro do Prisma ao remover doações", async () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    prisma.donation.findMany.mockResolvedValue([{ id: "1", isRecurring: { dateFinalized: yesterday.toISOString() } }]);
    prisma.donation.deleteMany.mockRejectedValue(new Error("fail"));
    await expect(service.deleteExpiredDonations()).rejects.toThrow("fail");
  });
});
