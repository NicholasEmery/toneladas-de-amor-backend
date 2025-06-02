import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "../../database/prisma.service";

@Injectable()
export class DeleteUserService {
  constructor(private readonly prisma: PrismaService) {}

  async deleteUser(userId: string): Promise<void> {
    try {
      await this.prisma.user.delete({
        where: { id: userId },
      });
    } catch (error: unknown) {
      if (error instanceof Error && error.name === "NotFoundError") {
        throw new NotFoundException("User not found");
      }
      throw new BadRequestException((error as Error).message);
    }
  }
}
