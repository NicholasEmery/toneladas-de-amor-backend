import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";

@Injectable()
export class DeleteUserService {
  constructor(private readonly prisma: PrismaService) {}

  async deleteUser(userId: string): Promise<boolean> {
    try {
      await this.prisma.user.delete({
        where: { id: userId },
      });

      return true;  
    } catch (error: any) {
      if (error.name === "NotFoundError") {
        throw new NotFoundException("User not found");
      }
      throw new BadRequestException(error.message);
    }
  }
}
