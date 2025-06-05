import { Test, TestingModule } from "@nestjs/testing";
import { MailServiceVerifiedEmail } from "./mail-verified-email.service";

describe("MailServiceVerifiedEmail", () => {
  let service: MailServiceVerifiedEmail;

  beforeAll(() => {
    process.env.EMAIL_HOST = "smtp.test.com";
    process.env.EMAIL_PORT = "587";
    process.env.EMAIL_USER = "test@test.com";
    process.env.EMAIL_PASSWORD = "testpass";
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MailServiceVerifiedEmail],
    }).compile();

    service = module.get<MailServiceVerifiedEmail>(MailServiceVerifiedEmail);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
