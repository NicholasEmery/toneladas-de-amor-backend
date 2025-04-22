import { Module } from "@nestjs/common";
import { MailServiceVerifiedEmail } from "./mail-verified-email.service";

@Module({
  providers: [MailServiceVerifiedEmail],
  exports: [MailServiceVerifiedEmail],
})
export class MailModuleVerifiedEmail {}
