import { Module, ValidationPipe } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { APP_PIPE } from '@nestjs/core';
import { EmailVerificationModule } from './auth/email-verification/email-verification.module';
import { MailModuleVerifiedEmail } from './mail/mail-otp/mail-verified-email.module';
import { MailResetPasswordService } from './mail/mail-reset-password/mail-reset-password.service';
import { MailResetPasswordModule } from './mail/mail-reset-password/mail-reset-password.module';
import { OrganizationModule } from './organization/organization.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    DatabaseModule,
    EmailVerificationModule,
    MailModuleVerifiedEmail,
    MailResetPasswordModule,
    OrganizationModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    MailResetPasswordService,
  ],
})
export class AppModule {}
