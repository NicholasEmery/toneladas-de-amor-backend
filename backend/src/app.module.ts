import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { ConfigModule } from "@nestjs/config";
import { DatabaseModule } from "./database/database.module";
import { EmailVerificationModule } from "./auth/email-verification/email-verification.module";
import { MailModuleVerifiedEmail } from "./mail/mail-otp/mail-verified-email.module";
import { MailResetPasswordService } from "./mail/mail-reset-password/mail-reset-password.service";
import { MailResetPasswordModule } from "./mail/mail-reset-password/mail-reset-password.module";
import { ProductController } from "./product/product.controller";
import { ProductModule } from "./product/product.module";
import { CreateUserModule } from "./user/create-user/create-user.module";
import { JwtModule } from "@nestjs/jwt";
import { GetUserModule } from "./user/get-user/get-user.module";

@Module({
  imports: [
    AuthModule,
    DatabaseModule,
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.register({
      global: true,
      secret: process.env.SECRET_KEY,
    }),
    CreateUserModule,
    GetUserModule,
    EmailVerificationModule,
    MailModuleVerifiedEmail,
    MailResetPasswordModule,
    ProductModule,
  ],
  providers: [
    MailResetPasswordService,
  ],
  controllers: [ProductController],
})
export class AppModule {}