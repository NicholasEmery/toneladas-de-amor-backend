import { Module } from "@nestjs/common";
import { EmailVerificationService } from "./email-verification.service";
import { EmailVerificationController } from "./email-verification.controller";
import { DatabaseModule } from "src/database/database.module";
import { MailModuleVerifiedEmail } from "src/mail/mail-otp/mail-verified-email.module";

@Module({
  imports: [DatabaseModule, MailModuleVerifiedEmail],
  controllers: [EmailVerificationController],
  providers: [EmailVerificationService],
})
export class EmailVerificationModule {}
