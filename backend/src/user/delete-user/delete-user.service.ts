import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../database/prisma.service";
import { DeleteUserByIdDto } from "../dto/deleteUser/deleteUserById.dto";

@Injectable()
export class DeleteUserService {
  constructor(private readonly prisma: PrismaService) {}

  async deleteUser(deleteUserByIdDto: DeleteUserByIdDto): Promise<boolean> {
    try {
      const { userId } = deleteUserByIdDto;

      await this.prisma.user.delete({
        where: { id: userId },
      });

      return true;
    } catch (error: unknown) {
      if (error instanceof Error && error.name === "NotFoundError") {
        throw new NotFoundException("User not found");
      }
      throw new BadRequestException("Failed to delete user" + error);
    }
  }
}
