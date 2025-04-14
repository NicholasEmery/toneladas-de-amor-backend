import { Test, TestingModule } from '@nestjs/testing';
import { EmailResetPasswordController } from './email-reset-password.controller';

describe('EmailResetPasswordController', () => {
  let controller: EmailResetPasswordController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmailResetPasswordController],
    }).compile();

    controller = module.get<EmailResetPasswordController>(
      EmailResetPasswordController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
