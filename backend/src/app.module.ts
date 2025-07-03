import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { ConfigModule } from "@nestjs/config";
import { DatabaseModule } from "./database/database.module";
import { EmailVerificationModule } from "./auth/email-verification/email-verification.module";
import { MailModuleVerifiedEmail } from "./mail/mail-otp/mail-verified-email.module";
import { CreateUserModule } from "./user/create-user/create-user.module";
import { JwtModule } from "@nestjs/jwt";
import { GetUserModule } from "./user/get-user/get-user.module";
import { DeleteUserModule } from "./user/delete-user/delete-user.module";
import { UpdateUserModule } from "./user/update-user/update-user.module";
import { CheckoutModule } from "./checkout/checkout.module";
import { CreateDonationModule } from "./donation/create-donation/create-donation.module";
import { UpdateDonationModule } from "./donation/update-donation/update-donation.module";
import { GetDonationModule } from "./donation/get-donation/get-donation.module";
import { ScheduleModule } from "@nestjs/schedule";
import { GetBalanceController } from './get-balance/get-balance.controller';
import { GetBalanceModule } from './get-balance/get-balance.module';

@Module({
  imports: [
    AuthModule,
    DatabaseModule,
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.register({
      global: true,
      secret: process.env.SECRET_KEY,
    }),
    CreateUserModule,
    GetUserModule,
    DeleteUserModule,
    UpdateUserModule,
    EmailVerificationModule,
    MailModuleVerifiedEmail,
    CheckoutModule,
    CreateDonationModule,
    UpdateDonationModule,
    GetDonationModule,
    GetBalanceModule,
  ],
  controllers: [GetBalanceController],
})
export class AppModule {}
