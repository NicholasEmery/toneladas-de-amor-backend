import { Controller, Post, Body, HttpCode, Request } from '@nestjs/common';
import { EmailVerificationService } from './email-verification.service';
import { SendOtpDto } from './dto/sendOtp.dto';
import { VerifyOptDto } from './dto/verifyOtp.dto';

@Controller('auth/verification/email')
export class EmailVerificationController {
  constructor(
    private readonly emailVerificationService: EmailVerificationService,
  ) {}

  @Post('send/otp')
  @HttpCode(200)
  async sendOTP(
    @Body() sendOtpDto: SendOtpDto,
  ): Promise<{ sucess: string; statusCode: number }> {
    await this.emailVerificationService.sendOtp(sendOtpDto.email);

    return {
      sucess: 'OTP enviado com sucesso para o email.',
      statusCode: 200,
    };
  }

  @Post('verify/otp')
  @HttpCode(200)
  async verifyOTP(
    @Body() verifyOptDto: VerifyOptDto,
  ): Promise<{ emailVerified: boolean }> {
    return await this.emailVerificationService.verifyOtp(
      verifyOptDto.otp,
      verifyOptDto.email,
    );
  }
}
