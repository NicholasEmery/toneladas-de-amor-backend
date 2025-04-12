import { User as PrismaUser } from '@prisma/client';

export class User implements PrismaUser {
  id: string;
  email: string;
  name: string;
  password: string;
  emailVerified: boolean;
  otp: string | null;
  expiresOtpAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  tokenVersion: number;
  role: string;
}
