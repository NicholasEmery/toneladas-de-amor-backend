import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import { GetDonationDto } from "../dto/getDonation/getDonation.dto";
import { Donation, Status } from "@prisma/client";

@Injectable()
export class GetDonationService {
  constructor(private readonly prisma: PrismaService) {}

  async getDonation(
    getDonationDto: GetDonationDto,
  ): Promise<
    | (Omit<Donation, "id" | "userId" | "updatedAt" | "createdAt"> & { createdAt: string })
    | (Omit<Donation, "id" | "userId" | "status" | "updatedAt" | "createdAt"> & { createdAt: string })[]
  > {
    try {
      const { userId } = getDonationDto;

      if (userId) {
        const donation = await this.prisma.donation.findUnique({
          where: { userId },
          select: {
            user: { select: { name: true } },
            amount: true,
            status: true,
            methodPayment: true,
            isRecurring: true,
            createdAt: true,
          },
        });

        if (!donation) {
          throw new NotFoundException("Donation not found");
        }

        return {
          ...donation,
          createdAt: donation.createdAt instanceof Date ? donation.createdAt.toISOString() : donation.createdAt,
        };
      }

      const allDonations = await this.prisma.donation.findMany({
        where: { status: Status.COMFIRMED },
        select: {
          user: { select: { id: true, name: true } },
          amount: true,
          methodPayment: true,
          isRecurring: true,
          createdAt: true,
        },
      });

      if (!allDonations) {
        throw new BadRequestException("No donations comfirmed found");
      }

      return allDonations.map((donation) => ({
        ...donation,
        createdAt: donation.createdAt instanceof Date ? donation.createdAt.toISOString() : donation.createdAt,
      }));
    } catch (error) {
      throw new BadRequestException("It was not possible to get the donation.");
    }
  }
}
