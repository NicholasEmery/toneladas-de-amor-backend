import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "../database/prisma.service";
import { SignInDto } from "./dto/signIn.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async signin(signInDto: SignInDto): Promise<{
    access_token: string;
    refresh_token: string;
    user: {
      name: string;
      role: string;
    };
  }> {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: signInDto.email },
      select: { id: true, password: true, tokenVersion: true, emailVerified: true, role: true, name: true },
    });

    const passwordMatch: boolean = await bcrypt.compare(signInDto.password, existingUser!.password);

    if (!existingUser || !passwordMatch) {
      throw new UnauthorizedException("Invalid credentials");
    }

    if (existingUser.emailVerified === false) throw new UnauthorizedException("Email not verified");

    const payloadAccess: { sub: string; version: number; type: string } = {
      sub: existingUser.id,
      version: existingUser.tokenVersion,
      type: "access",
    };

    const payloadRefresh: { sub: string; version: number; type: string } = {
      sub: existingUser.id,
      version: existingUser.tokenVersion,
      type: "refresh",
    };

    const access_token: string = await this.jwtService.signAsync(payloadAccess, {
      expiresIn: "15m", // Tempo de expiração do access token
    });
    const refresh_token: string = await this.jwtService.signAsync(payloadRefresh, {
      expiresIn: "7d", // Tempo de expiração do refresh token
    });

    return { access_token, refresh_token, user: { name: existingUser.name, role: existingUser.role } };
  }

  async refreshToken(refresh_token: string): Promise<{ accessToken: string; refreshToken: string }> {
    const decoded = this.jwtService.decode(refresh_token);

    if (
      !decoded ||
      typeof decoded !== "object" ||
      !("sub" in decoded) ||
      !("version" in decoded) ||
      !("type" in decoded)
    ) {
      throw new UnauthorizedException("Invalid refresh token format");
    }

    if (decoded.type !== "refresh") {
      throw new UnauthorizedException("Invalid token type, please use a valid refresh token");
    }

    try {
      const payload = await this.jwtService.verifyAsync(refresh_token); // Verifica e decodifica o token JWT

      const user = await this.prisma.user.findUnique({
        where: { id: payload.sub },
        select: { id: true, tokenVersion: true },
      });

      if (!user || user.tokenVersion !== payload.version) {
        throw new Error();
      }

      // Rotaciona o token incrementando a versão
      const updatedUser = await this.prisma.user.update({
        where: { id: payload.sub },
        data: { tokenVersion: { increment: 1 } },
        select: { id: true, tokenVersion: true },
      });

      const newPayloadAccess: { sub: string; version: number; type: string } = {
        sub: updatedUser.id,
        version: updatedUser.tokenVersion,
        type: "access",
      };

      const newPayloadRefresh: { sub: string; version: number; type: string } = {
        sub: updatedUser.id,
        version: updatedUser.tokenVersion,
        type: "refresh",
      };

      const accessToken: string = await this.jwtService.signAsync(newPayloadAccess, {
        expiresIn: "15m",
      });
      const refreshToken: string = await this.jwtService.signAsync(newPayloadRefresh, {
        expiresIn: "7d",
      });

      return { accessToken, refreshToken };
    } catch (error: unknown) {
      if (error instanceof Error && error.name === "JsonWebTokenError") {
        throw new UnauthorizedException("Invalid refresh token");
      }
      if (error instanceof Error && error.name === "TokenExpiredError") {
        throw new UnauthorizedException("Refresh token expired, please login again");
      }
      throw new BadRequestException("Error processing refresh token");
    }
  }

  async logout(accessToken: string): Promise<boolean> {
    try {
      const payload = await this.jwtService.verifyAsync(accessToken); // Verifica e decodifica o token JWT

      if (payload.type !== "access") {
        throw new UnauthorizedException("Invalid token type, please use a valid access token");
      }

      await this.prisma.user.update({
        where: { id: payload.sub },
        data: { tokenVersion: { increment: 1 } }, // Incrementa a versão do token
      });

      return true;
    } catch (error: unknown) {
      if (error instanceof Error && error.name === "JsonWebTokenError") {
        throw new UnauthorizedException("Invalid access token");
      }
      if (error instanceof Error && error.name === "TokenExpiredError") {
        throw new UnauthorizedException("Access token expired, please refresh your token");
      }
      throw new BadRequestException("Error processing logout");
    }
  }
}
