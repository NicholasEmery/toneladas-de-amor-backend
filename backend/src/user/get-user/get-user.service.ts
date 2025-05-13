import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { Role } from "@prisma/client";
import { PrismaService } from "src/database/prisma.service";

@Injectable()
export class GetUserService {
  constructor(private readonly prisma: PrismaService) {}

  async getUserById(userId: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!user) {
        throw new NotFoundException("User not found");
      }

      return user;
        } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error(error);
      throw new Error("Error fetching user by ID");
    }
  }

  async getUserByEmail(email: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email: email,
        },
      });

      if (!user) {
        throw new NotFoundException("User not found");
      }

      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException("Error fetching user by email");
    }
  }

  async getUserByPhone(phone: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          phone: phone,
        },
      });

      if (!user) {
        throw new NotFoundException("User not found");
      }

      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException("Error fetching user by phone");
    }
  }

  async getUserByName(name: string) {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          name: name,
        },
      });

      if (!user) {
        throw new NotFoundException("User not found");
      }

      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException("Error fetching user by name");
    }
  }

  async getUserByRole(role: Role) {
    try {
      const user = await this.prisma.user.findMany({
        where: {
          role: role,
        },
      });

      if (!user || user.length === 0) {
        throw new NotFoundException("User not found");
      }

      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException("Error fetching user by role");
    }
  }

  async getAllUsers() {
    try {
      const users = await this.prisma.user.findMany();
      return users;
    } catch (error) {
      throw new BadRequestException("Error fetching all users");
    }
  }
}