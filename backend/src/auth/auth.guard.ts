import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class AuthGuard implements CanActivate {
  @Inject()
  private readonly jwtService: JwtService;

  @Inject()
  private readonly prisma: PrismaService;

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const cookie = request.cookies['access_token'];

    if (!cookie) {
      throw new UnauthorizedException('Access token is missing');
    }

    try {
      const payload = this.jwtService.verify(cookie, {
        secret: process.env.SECRET_KEY,
      });

      const user = await this.prisma.user.findUnique({
        where: { id: payload.sub, tokenVersion: payload.version },
      });

      if (!user) {
        throw new UnauthorizedException('User does not exist');
      }

      if (user.tokenVersion !== payload.version) {
        throw new UnauthorizedException('Token Invalidated');
      }

      // Attach user to request for further use
      request.user = user;

      return true;
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Token has expired');
      }
      throw new UnauthorizedException('Invalid token');
    }
  }
}
