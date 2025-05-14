import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import { UpdateUserUpheldDto } from "../dto/updateUser/updateUserUpheld.dto";
import { User } from "@prisma/client";

@Injectable()
export class UpdateUserService {
  constructor(private readonly prisma: PrismaService) {}

  async updateUserUpheld(
    userId: string,
    updateUserUpheldDto: UpdateUserUpheldDto,
  ): Promise<User> {
    try {
      const { fieldsRole, ...updateData } = updateUserUpheldDto;

      const user = await this.prisma.user.update({
        where: { id: userId },
        data: {
          ...updateData,
          fieldsRole: JSON.parse(JSON.stringify(fieldsRole)),
        },
      });

      if (!user) {
        throw new NotFoundException("User not found");
      }

      return user;
    } catch (error: any) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }

  async updateUserDonator(
    userId: string,
    updateUserDonatorDto: any,
  ): Promise<User> {
    try {
      const { fieldsRole, ...updateData } = updateUserDonatorDto;

      const user = await this.prisma.user.update({
        where: { id: userId },
        data: {
          ...updateData,
          fieldsRole: JSON.parse(JSON.stringify(fieldsRole)),
        },
      });

      if (!user) {
        throw new NotFoundException("User not found");
      }

      return user;
    } catch (error: any) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }

  async updateUserColaborator(
    userId: string,
    updateUserColaboratorDto: any,
  ): Promise<User> {
    try {
      const { fieldsRole, ...updateData } = updateUserColaboratorDto;

      const user = await this.prisma.user.update({
        where: { id: userId },
        data: {
          ...updateData,
          fieldsRole: JSON.parse(JSON.stringify(fieldsRole)),
        },
      });

      if (!user) {
        throw new NotFoundException("User not found");
      }

      return user;
    } catch (error: any) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }

  async updateUserAdmin(
    userId: string,
    updateUserAdminDto: any,
  ): Promise<User> {
    try {
      const { ...updateData } = updateUserAdminDto;

      const user = await this.prisma.user.update({
        where: { id: userId },
        data: {
          ...updateData,
        },
      });

      if (!user) {
        throw new NotFoundException("User not found");
      }

      return user;
    } catch (error: any) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }
}
