import { Test, TestingModule } from '@nestjs/testing';
import { EmailResetPasswordService } from './email-reset-password.service';

describe('EmailResetPasswordService', () => {
  let service: EmailResetPasswordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmailResetPasswordService],
    }).compile();

    service = module.get<EmailResetPasswordService>(EmailResetPasswordService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
