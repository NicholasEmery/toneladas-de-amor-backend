import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import { UpdateDonationDto } from "../dto/updateDonation/updateDonation.dto";

@Injectable()
export class UpdateDonationService {
  constructor(private readonly prisma: PrismaService) {}

  async updateonation(updateDonationDto: UpdateDonationDto): Promise<boolean> {
    const { donationId, userId, status } = updateDonationDto;

    // Verifica se a doação existe
    const existingDonation = await this.prisma.donation.findUnique({
      where: { id: donationId, userId: userId },
    });

    if (!existingDonation) {
      throw new Error("Doação não encontrada.");
    }

    // Atualiza a doação
    await this.prisma.donation.update({
      where: { id: donationId, userId: userId },
      data: {
        status: status,
      },
    });

    return true;
  }
}
