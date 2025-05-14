import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/database/prisma.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async signin(params: {
    email: string;
    password: string;
  }): Promise<{ access_token: string; refresh_token: string; role: string }> {
    const user = await this.prisma.user.findUnique({
      where: { email: params.email },
    });
    if (!user) throw new NotFoundException("User not found");

    const passwordMatch = await bcrypt.compare(params.password, user.password);
    if (!passwordMatch) throw new UnauthorizedException("Invalid credentials");

    if (user.emailVerified === false)
      throw new UnauthorizedException("Email not verified");

    const payload = {
      sub: user.id,
      version: user.tokenVersion,
      role: user.role,
    };

    const access_token = await this.jwtService.signAsync(payload, {
      expiresIn: "15m", // Tempo de expiração do access token
    });
    const refresh_token = await this.jwtService.signAsync(payload, {
      expiresIn: "7d", // Tempo de expiração do refresh token
    });

    return { access_token, refresh_token, role: user.role };
  }

  async refreshToken(
    refresh_token: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    try {
      const payload = this.jwtService.verify(refresh_token);

      const user = await this.prisma.user.findUnique({
        where: { id: payload.sub, tokenVersion: payload.version },
      });

      if (!user) throw new UnauthorizedException();

      // Rotaciona o token incrementando a versão
      await this.prisma.user.update({
        where: { id: user.id },
        data: { tokenVersion: { increment: 1 } },
      });

      const newPayload = {
        sub: user.id,
        version: user.tokenVersion + 1,
        role: user.role,
      };

      const accessToken = await this.jwtService.signAsync(newPayload, {
        expiresIn: "15m",
      });
      const refreshToken = await this.jwtService.signAsync(newPayload, {
        expiresIn: "7d",
      });

      return { accessToken, refreshToken };
    } catch (error: any) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }

  async logout(accessToken: string) {
    try {
      const payload = this.jwtService.verify(accessToken); // Verifica e decodifica o token JWT

      await this.prisma.user.update({
        where: { id: payload.sub },
        data: { tokenVersion: { increment: 1 } }, // Incrementa a versão do token
      });
    } catch (error) {
      throw new UnauthorizedException("Invalid or expired refresh token");
    }
  }
}
