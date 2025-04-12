import { Module } from '@nestjs/common';
import { EmailResetPasswordService } from './email-reset-password.service';
import { EmailResetPasswordController } from './email-reset-password.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [EmailResetPasswordService],
  controllers: [EmailResetPasswordController]
})
export class EmailResetPasswordModule {}
