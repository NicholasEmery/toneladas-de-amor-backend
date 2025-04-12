import { Test, TestingModule } from '@nestjs/testing';
import { MailServiceVerifiedEmail } from './mail-verified-email.service';

describe('MailServiceVerifiedEmail', () => {
  let service: MailServiceVerifiedEmail;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MailServiceVerifiedEmail],
    }).compile();

    service = module.get<MailServiceVerifiedEmail>(MailServiceVerifiedEmail);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
