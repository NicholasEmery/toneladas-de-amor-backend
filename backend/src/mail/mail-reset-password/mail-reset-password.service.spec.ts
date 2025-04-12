import { Test, TestingModule } from '@nestjs/testing';
import { MailResetPasswordService } from './mail-reset-password.service';

describe('MailResetPasswordService', () => {
  let service: MailResetPasswordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MailResetPasswordService],
    }).compile();

    service = module.get<MailResetPasswordService>(MailResetPasswordService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
