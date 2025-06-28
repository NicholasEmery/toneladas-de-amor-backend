import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { CreateUserUpheldDto } from "../dto/createUser/createUserUpheld.dto";
import { PrismaService } from "../../database/prisma.service";
import * as bcrypt from "bcrypt";
import { CreateUserDonatorDto } from "../dto/createUser/createUserDonator.dto";
import { CreateUserColaboratorDto } from "../dto/createUser/createUserColaborator.dto";
import { CreateUserAdminDto } from "../dto/createUser/createUserAdmin.dto";
import { JwtService } from "@nestjs/jwt";
import { User } from "@prisma/client";

@Injectable()
export class CreateUserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}
  async createUserUpheld(
    createUserUpheldDto: CreateUserUpheldDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const { name, email, password, phone, role, fieldsRole } = createUserUpheldDto;

    const existingEmail: boolean = !!(await this.prisma.user.findUnique({
      where: { email: email },
    }));

    if (existingEmail) {
      throw new BadRequestException("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
        phone: phone,
        role: role,
        fieldsRole: JSON.parse(JSON.stringify(fieldsRole)),
        tokenVersion: 1,
      },
    });

    const payload = {
      sub: user.id,
      version: user.tokenVersion,
    };

    const access_token = await this.jwtService.signAsync(payload, {
      expiresIn: "15m", // Tempo de expiração do access token
    });
    const refresh_token = await this.jwtService.signAsync(payload, {
      expiresIn: "7d", // Tempo de expiração do refresh token
    });

    return {
      accessToken: access_token,
      refreshToken: refresh_token,
    };
  }

  async createUserDonator(
    createUserDonatorDto: CreateUserDonatorDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const { name, email, password, phone, role, fieldsRole } = createUserDonatorDto;

    const existingEmail: boolean = !!(await this.prisma.user.findUnique({
      where: { email: email },
    }));

    if (existingEmail) {
      throw new BadRequestException("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
        phone: phone,
        role: role,
        fieldsRole: JSON.stringify({ fieldsRole }),
        tokenVersion: 1,
      },
    });

    const payload = {
      sub: user.id,
      version: user.tokenVersion,
    };

    const access_token = await this.jwtService.signAsync(payload, {
      expiresIn: "15m", // Tempo de expiração do access token
    });
    const refresh_token = await this.jwtService.signAsync(payload, {
      expiresIn: "7d", // Tempo de expiração do refresh token
    });

    return {
      accessToken: access_token,
      refreshToken: refresh_token,
    };
  }

  async createUserColaborator(
    createUserColaboratorDto: CreateUserColaboratorDto,
    accessToken: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    try {
      try {
        interface JwtPayload {
          sub: string;
          version: number;
          role?: string;
          [key: string]: unknown;
        }
        const decoded: JwtPayload = await this.jwtService.verifyAsync<JwtPayload>(accessToken);
        if (decoded.role !== "ADMIN") {
          throw new UnauthorizedException("Only ADMIN users can create collaborators");
        }
      } catch (error) {
        throw new UnauthorizedException("Invalid token");
      }

      const { name, email, password, phone, role, fieldsRole } = createUserColaboratorDto;

      const existingEmail: boolean = !!(await this.prisma.user.findUnique({
        where: { email: email },
      }));

      if (existingEmail) {
        throw new BadRequestException("User already exists");
      }

      const hashedPassword: string = await bcrypt.hash(password, 10);

      const user: User = await this.prisma.user.create({
        data: {
          name: name,
          email: email,
          password: hashedPassword,
          phone: phone,
          role: role,
          fieldsRole: JSON.stringify({ fieldsRole }),
          tokenVersion: 1,
        },
      });

      const payload: { sub: string; version: number } = {
        sub: user.id,
        version: user.tokenVersion,
      };

      const access_token: string = await this.jwtService.signAsync(payload, {
        expiresIn: "15m", // Tempo de expiração do access token
      });
      const refresh_token: string = await this.jwtService.signAsync(payload, {
        expiresIn: "7d", // Tempo de expiração do refresh token
      });

      return {
        accessToken: access_token,
        refreshToken: refresh_token,
      };
    } catch (error) {
      throw new BadRequestException("Error creating user");
    }
  }

  async createUserAdmin(
    createUserAdminDto: CreateUserAdminDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const { name, email, password, phone, role } = createUserAdminDto;

    const existingEmail: boolean = !!(await this.prisma.user.findUnique({
      where: { email: email },
    }));

    if (existingEmail) {
      throw new BadRequestException("User already exists");
    }

    const hashedPassword: string = await bcrypt.hash(password, 10);

    const user: User = await this.prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
        phone: phone,
        role: role,
        tokenVersion: 1,
      },
    });

    const payload: { sub: string; version: number } = {
      sub: user.id,
      version: user.tokenVersion,
    };

    const access_token: string = await this.jwtService.signAsync(payload, {
      expiresIn: "15m", // Tempo de expiração do access token
    });
    const refresh_token: string = await this.jwtService.signAsync(payload, {
      expiresIn: "7d", // Tempo de expiração do refresh token
    });

    return {
      accessToken: access_token,
      refreshToken: refresh_token,
    };
  }
}
