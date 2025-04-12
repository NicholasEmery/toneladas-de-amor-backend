import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class AuthService {
  @Inject()
  private readonly prisma: PrismaService;

  @Inject()
  private readonly jwtService: JwtService;

  async signin(
    params: { email: string; password: string },
  ): Promise<{ access_token: string; }> {
    const user = await this.prisma.user.findUnique({
      where: { email: params.email },
    });
    if (!user) throw new NotFoundException('User not found');
    const passwordMatch = await bcrypt.compare(params.password, user.password);
    if (!passwordMatch) throw new UnauthorizedException('Invalid credentials');
    if (user.emailVerified === false) throw new UnauthorizedException('Email not verified');
    const payload = { sub: user.id, version: user.tokenVersion };
    const access_token = await this.jwtService.signAsync(payload, {
      expiresIn: '30d', // Tempo de expiração do access token
    });

    return { access_token };
  }

  async logout(cookie: string) {
    const payload = this.jwtService.verify(cookie, {
      secret: process.env.SECRET_KEY,
    }); // Verifica e decodifica o token JWT
    const userId = payload.sub; // Obtém o ID do usuário a partir do payload do token
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    })

    if (!user) throw new NotFoundException('User not found');

    await this.prisma.user.update({
      where: { id: userId },
      data: { tokenVersion: { increment: 1 } },
    });
  }
}
