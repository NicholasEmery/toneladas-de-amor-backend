import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { Role, User } from "@prisma/client";
import { PrismaService } from "../../database/prisma.service";

@Injectable()
export class GetUserService {
  constructor(private readonly prisma: PrismaService) {}

  async getUserById(userId: string): Promise<User> {
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
      throw new Error("Error fetching user by ID");
    }
  }

  async getUserByEmail(email: string): Promise<User> {
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

  async getUserByPhone(phone: string): Promise<User> {
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

  async getUserByName(name: string): Promise<User> {
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

  async getUserByRole(role: Role): Promise<User[]> {
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

  async getAllUsers(): Promise<User[]> {
    try {
      const users = await this.prisma.user.findMany();

      if (!users || users.length === 0) {
        throw new NotFoundException("No users found");
      }

      return users;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error; // Relança o erro específico já tratado no try
      }
      throw new BadRequestException("Error fetching all users");
    }
  }
}
