import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Role } from "@prisma/client";
import { PrismaService } from "../database/prisma.service";
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
      throw new Error("Role is required for this operation");
    }

    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers["authorization"];

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new UnauthorizedException("Access token is missing");
    }
    const accessToken = authHeader.split(" ")[1];
    try {
      const payload = this.jwtService.verify(accessToken);

      if (payload.type !== "access") {
        throw new UnauthorizedException("Invalid token type, please use an access token");
      }

      const user = await this.prisma.user.findUnique({
        where: { id: payload.sub, tokenVersion: payload.version },
        select: {
          role: true,
        },
      });

      if (!user) {
        throw new UnauthorizedException("User does not exist or invalid access token");
      }

      if (!requiredRoles.includes(user.role)) {
        throw new UnauthorizedException("You do not have permission to perform this operation");
      }

      return true;
    } catch (error: unknown) {
      if (error instanceof Error && error.name === "JsonWebTokenError") {
        throw new UnauthorizedException("Invalid access token");
      }
      if (error instanceof Error && error.name === "TokenExpiredError") {
        throw new UnauthorizedException("Access token expired, please refresh your token");
      }
      throw new UnauthorizedException("Invalid token");
    }
  }
}
