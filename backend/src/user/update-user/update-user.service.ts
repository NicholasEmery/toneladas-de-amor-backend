import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "../../database/prisma.service";
import { UpdateUserUpheldDto } from "../dto/updateUser/updateUserUpheld.dto";
import { User } from "@prisma/client";
import { InputJsonValue } from "@prisma/client/runtime/library";
import { Prisma } from "@prisma/client";
import { UpdateUserDonatorDto } from "../dto/updateUser/updateUserDonator.dto";
import { UpdateUserColaboratorDto } from "../dto/updateUser/updateUserColaborator.dto";
import { UpdateUserAdminDto } from "../dto/updateUser/updateUserAdmin.dto";

@Injectable()
export class UpdateUserService {
  constructor(private readonly prisma: PrismaService) {}

  async updateUserUpheld(
    userId: string,
    updateUserUpheldDto: UpdateUserUpheldDto,
  ): Promise<User> {
    try {
      const { fieldsRole } = updateUserUpheldDto;

      const user = await this.prisma.user.update({
        where: { id: userId },
        data: {
          fieldsRole: JSON.parse(
            JSON.stringify(fieldsRole),
          ) as Prisma.InputJsonValue,
        },
      });

      if (!user) {
        throw new NotFoundException("User not found");
      }

      return user;
    } catch (error: unknown) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException((error as Error).message);
    }
  }

  async updateUserDonator(
    userId: string,
    updateUserDonatorDto: UpdateUserDonatorDto,
  ): Promise<User> {
    try {
      const { fieldsRole, ...updateData } = updateUserDonatorDto;

      const user = await this.prisma.user.update({
        where: { id: userId },
        data: {
          ...updateData,
          fieldsRole: JSON.parse(JSON.stringify(fieldsRole)) as InputJsonValue,
        },
      });

      if (!user) {
        throw new NotFoundException("User not found");
      }

      return user;
    } catch (error: unknown) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException((error as Error).message);
    }
  }

  async updateUserColaborator(
    userId: string,
    updateUserColaboratorDto: UpdateUserColaboratorDto,
  ): Promise<User> {
    try {
      const { fieldsRole, ...updateData } = updateUserColaboratorDto;

      const user = await this.prisma.user.update({
        where: { id: userId },
        data: {
          ...updateData,
          fieldsRole: JSON.parse(JSON.stringify(fieldsRole)) as InputJsonValue,
        },
      });

      if (!user) {
        throw new NotFoundException("User not found");
      }

      return user;
    } catch (error: unknown) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException((error as Error).message);
    }
  }

  async updateUserAdmin(
    userId: string,
    updateUserAdminDto: UpdateUserAdminDto,
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
    } catch (error: unknown) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException((error as Error).message);
    }
  }
}
