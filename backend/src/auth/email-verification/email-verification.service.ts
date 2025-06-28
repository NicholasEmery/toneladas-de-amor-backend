import { Injectable, BadRequestException, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../database/prisma.service";
import { MailServiceVerifiedEmail } from "../../mail/mail-otp/mail-verified-email.service";

@Injectable()
export class EmailVerificationService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mailServiceVerifiedEmail: MailServiceVerifiedEmail,
  ) {}

  async sendOtp(email: string): Promise<boolean> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email: email },
        select: {
          id: true,
        },
      });

      if (!user) {
        throw new NotFoundException("User not found for the provided email");
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

      await this.mailServiceVerifiedEmail.sendMail(email, otp); // Envia o email com o OTP

      return true;
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException("Failed to send OTP email");
    }
  }

  async verifyOtp(otp: string, email: string): Promise<boolean> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email: email },
        select: {
          id: true,
          otp: true,
          expiresOtpAt: true,
        },
      });

      if (!user) {
        throw new NotFoundException("User not found for the provided email");
      }

      if (otp !== user.otp) {
        throw new BadRequestException("Invalid OTP");
      }

      if (new Date() > user.expiresOtpAt!) {
        throw new BadRequestException("OTP expired");
      }

      await this.prisma.user.update({
        where: { id: user.id },
        data: {
          otp: null,
          expiresOtpAt: null,
        },
      });

      return true;
    } catch (error) {
      throw new BadRequestException("Failed to verify OTP");
    }
  }
}
