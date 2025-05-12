import { forwardRef, Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { AuthGuard } from "./auth.guard";
import { DatabaseModule } from "src/database/database.module";
import { EmailResetPasswordModule } from "./email-reset-password/email-reset-password.module";

@Module({
  imports: [
    DatabaseModule,
    EmailResetPasswordModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard],
  exports: [AuthGuard, AuthService],
})
export class AuthModule {}
