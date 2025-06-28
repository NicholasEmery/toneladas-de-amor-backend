import { Test, TestingModule } from "@nestjs/testing";
import { EmailVerificationService } from "./email-verification.service";
import { PrismaService } from "../../database/prisma.service";

describe("EmailVerificationService", () => {
  let service: EmailVerificationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmailVerificationService, { provide: PrismaService, useValue: {} }],
    }).compile();

    service = module.get<EmailVerificationService>(EmailVerificationService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
