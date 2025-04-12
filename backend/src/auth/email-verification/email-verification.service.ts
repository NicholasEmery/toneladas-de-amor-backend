import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { MailServiceVerifiedEmail } from 'src/mail/mail-otp/mail-verified-email.service';

@Injectable()
export class EmailVerificationService {
  @Inject()
  private readonly prisma: PrismaService;

  @Inject()
  private readonly MailServiceVerifiedEmail: MailServiceVerifiedEmail;

  async sendOtp(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email: email },
      select: {
        id: true,
      },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Gera um OTP de 6 dígitos
    const expiresOtpAt = new Date(Date.now() + 10 * 60 * 1000); // Data atual + 10 minutos

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        otp: otp,
        expiresOtpAt: expiresOtpAt,
      },
    });

    await this.MailServiceVerifiedEmail.sendMail(email, otp); // Envia o email com o OTP
  }

  async verifyOtp(
    otp: string,
    email: string,
  ): Promise<{ emailVerified: boolean; success: string; statusCode: number }> {
    const user = await this.prisma.user.findUnique({
      where: { email: email },
      select: {
        otp: true,
        expiresOtpAt: true,
      },
    });

    if (otp !== user.otp) {
      throw new BadRequestException('Invalid OTP');
    }

    if (new Date() > user.expiresOtpAt) {
      throw new BadRequestException('OTP expired');
    }

    const updatedUser = await this.prisma.user.update({
      where: { email: email },
      data: {
        emailVerified: true,
        otp: null,
        expiresOtpAt: null,
      },
    });
    
    return {
      emailVerified: updatedUser.emailVerified,
      success: 'Email verified successfully',
      statusCode: 200,
    };
  }
}
