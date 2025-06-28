import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import { GetDonationDto } from "../dto/getDonation/getDonation.dto";
import { Donation, Status } from "@prisma/client";

@Injectable()
export class GetDonationService {
  constructor(private readonly prisma: PrismaService) {}

  async getDonation(
    getDonationDto: GetDonationDto,
  ): Promise<
    | (Omit<Donation, "updatedAt" | "createdAt"> & { createdAt: string })
    | (Omit<Donation, "status" | "updatedAt" | "createdAt"> & { createdAt: string })[]
  > {
    const { userId } = getDonationDto;

    if (userId) {
      const donation = await this.prisma.donation.findUnique({
        where: { userId },
        select: {
          id: true,
          userId: true,
          amount: true,
          status: true,
          methodPayment: true,
          isRecurring: true,
          createdAt: true,
          user: { select: { name: true } },
        },
      });

      if (!donation) {
        throw new BadRequestException("Donation not found");
      }

      return {
        ...donation,
        createdAt: donation.createdAt instanceof Date ? donation.createdAt.toISOString() : donation.createdAt,
      };
    }

    const allDonations = await this.prisma.donation.findMany({
      where: { status: Status.COMFIRMED },
      select: {
        id: true,
        userId: true,
        amount: true,
        methodPayment: true,
        isRecurring: true,
        createdAt: true,
        user: { select: { name: true } },
      },
    });

    if (!allDonations || allDonations.length === 0) {
      throw new BadRequestException("No donations comfirmed found");
    }

    return allDonations.map((donation) => ({
      ...donation,
      createdAt: donation.createdAt instanceof Date ? donation.createdAt.toISOString() : donation.createdAt,
    }));
  }
}
