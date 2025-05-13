import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Role } from "@prisma/client";
import { PrismaService } from "src/database/prisma.service";
import { ROLES_KEY } from "./roles.decorator";
import { error } from "console";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new UnauthorizedException("Access token is missing");
    }
    const token = authHeader.split(" ")[1];
    let payload;
    try {
      payload = this.jwtService.verify(token, {
        secret: process.env.SECRET_KEY,
      });
    } catch {
      if (error.name === "TokenExpiredError") {
        throw new UnauthorizedException("Token expired");
      }
    }

    // Verifica a role no payload OU no banco
    if (!requiredRoles.includes(payload.role)) {
      // Se quiser garantir que o usuário ainda é ADMIN no banco:
      const user = await this.prisma.user.findUnique({
        where: { id: payload.sub },
      });
      if (!user || !requiredRoles.includes(user.role)) {
        throw new UnauthorizedException(
          "You do not have permission to perform this request.",
        );
      }
    }

    request.user = payload;
    return true;
  }
}
