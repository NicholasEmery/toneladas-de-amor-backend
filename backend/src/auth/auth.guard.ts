import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "../database/prisma.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers["authorization"];

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new UnauthorizedException("Access token is missing");
    }

    const accessToken = authHeader.split(" ")[1];

    const decoded = this.jwtService.decode(accessToken);

    if (
      !decoded ||
      typeof decoded !== "object" ||
      !("sub" in decoded) ||
      !("version" in decoded) ||
      !("type" in decoded)
    ) {
      throw new UnauthorizedException("Invalid access token format");
    }

    if (decoded.type !== "access") {
      throw new UnauthorizedException("Invalid token type, please use an access token");
    }

    try {
      const payload = await this.jwtService.verifyAsync(accessToken);

      if (!payload) {
        throw new UnauthorizedException("Invalid access token");
      }

      const user = await this.prisma.user.findUnique({
        where: { id: payload.sub, tokenVersion: payload.version },
        select: {
          id: true,
          emailVerified: true,
        },
      });

      if (!user) {
        throw new UnauthorizedException("User does not exist or invalid access token");
      }

      if (user.emailVerified === false) {
        throw new UnauthorizedException("Email not verified, please verify your email");
      }

      request.user = user;

      return true;
    } catch (error: unknown) {
      if (error instanceof UnauthorizedException) {
        throw error; // Relança o erro específico já tratado no try
      }
      if (error instanceof Error && error.name === "TokenExpiredError") {
        throw new UnauthorizedException("Access token expired, please refresh your token");
      }
      throw new UnauthorizedException("Invalid token");
    }
  }
}
