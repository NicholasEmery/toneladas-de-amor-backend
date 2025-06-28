import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../database/prisma.service";

@Injectable()
export class DeleteUserService {
  constructor(private readonly prisma: PrismaService) {}

  async deleteUser(userId: string): Promise<boolean> {
    try {
      await this.prisma.user.delete({
        where: { id: userId },
      });

      return true;
    } catch (error: unknown) {
      if (error instanceof Error && error.name === "NotFoundError") {
        throw new NotFoundException("User not found");
      }
      throw new BadRequestException("Failed to delete user");
    }
  }
}
