import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import { UpdateDonationDto } from "../dto/updateDonation/updateDonation.dto";

@Injectable()
export class UpdateDonationService {
  constructor(private readonly prisma: PrismaService) {}

  async updateonation(updateDonationDto: UpdateDonationDto): Promise<boolean> {
    try {
      const { donationId, userId, status } = updateDonationDto;

      // Verifica se a doação existe
      const existingDonation = await this.prisma.donation.findUnique({
        where: { id: donationId, userId: userId },
      });

      if (!existingDonation) {
        throw new NotFoundException("Donation not found");
      }

      // Atualiza a doação
      await this.prisma.donation.update({
        where: { id: donationId },
        data: {
          status: status,
        },
      });

      return true;
    } catch (error) {
      throw new BadRequestException("Failed to update donation");
    }
  }
}
