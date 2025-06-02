import { Test, TestingModule } from "@nestjs/testing";
import { EmailResetPasswordService } from "./email-reset-password.service";
import { PrismaService } from "../../database/prisma.service";
import { JwtService } from "@nestjs/jwt";

describe("EmailResetPasswordService", () => {
  let service: EmailResetPasswordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmailResetPasswordService,
        { provide: PrismaService, useValue: {} },
        { provide: JwtService, useValue: {} },
      ],
    }).compile();

    service = module.get<EmailResetPasswordService>(EmailResetPasswordService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
