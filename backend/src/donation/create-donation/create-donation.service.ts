import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateDonationDto } from "../dto/createDonation/createDonation.dto";
import { PrismaService } from "src/database/prisma.service";
import { Donation } from "@prisma/client";

@Injectable()
export class CreateDonationService {
  constructor(private readonly prisma: PrismaService) {}

  async createDonation(createDonationDto: CreateDonationDto): Promise<Pick<Donation, "id" | "userId">> {
    try {
      const { userId, amount, methodPayment, status, isRecurring } = createDonationDto;

      const existingUser = await this.prisma.user.findUnique({
        where: { id: userId },
      });

      if (!existingUser) {
        throw new NotFoundException("User Not Found");
      }

      const existingDonation = await this.prisma.donation.findUnique({
        where: { userId },
      });

      if (existingDonation) {
        throw new BadRequestException("User already has a donation record.");
      }

      // Validação para doação recorrente
      const { recurringDonation, dateInitiated, dateFinalized } = isRecurring;

      if (recurringDonation === true) {
        if (!dateInitiated || !dateFinalized) {
          throw new BadRequestException(
            "Both dateInitiated and dateFinalized fields are required for recurring donations.",
          );
        }

        const now = new Date();
        const initiatedDate = new Date(dateInitiated!);
        const finalizedDate = new Date(dateFinalized!);

        const nowYear = now.getUTCFullYear();
        const nowMonth = now.getUTCMonth();
        const nowDay = now.getUTCDate();

        const initiatedYear = initiatedDate.getUTCFullYear();
        const initiatedMonth = initiatedDate.getUTCMonth();
        const initiatedDay = initiatedDate.getUTCDate();

        // dateInitiated nunca pode ser anterior à data atual (comparando só datas)
        if (
          initiatedYear < nowYear ||
          (initiatedYear === nowYear && initiatedMonth < nowMonth) ||
          (initiatedYear === nowYear && initiatedMonth === nowMonth && initiatedDay < nowDay)
        ) {
          throw new BadRequestException("The start date cannot be earlier than the current date.");
        }

        // dateInitiated só pode ser do mês atual ou do mês subsequente
        if (
          !(
            (initiatedYear === nowYear && (initiatedMonth === nowMonth || initiatedMonth === nowMonth + 1)) ||
            // Caso especial: dezembro para janeiro do próximo ano
            (nowMonth === 11 && initiatedYear === nowYear + 1 && initiatedMonth === 0)
          )
        ) {
          throw new BadRequestException("The start date must be in the current month or the following month.");
        }

        // dateFinalized deve ser exatamente o mês subsequente ao mês de início
        if (finalizedDate) {
          const finalizedYear = finalizedDate.getUTCFullYear();
          const finalizedMonth = finalizedDate.getUTCMonth();
          let nextMonth = initiatedMonth + 1;
          let nextYear = initiatedYear;
          if (nextMonth > 11) {
            nextMonth = 0;
            nextYear += 1;
          }
          if (!(finalizedYear === nextYear && finalizedMonth === nextMonth)) {
            throw new BadRequestException("The end date must be exactly the month following the start date.");
          }
        }
      }

      if (recurringDonation === false) {
        if (dateInitiated || dateFinalized) {
          throw new BadRequestException(
            "For non-recurring donations, dateInitiated and dateFinalized should not be provided.",
          );
        }
      }

      // Criação da doação
      const donation = await this.prisma.donation.create({
        data: {
          userId: userId,
          amount: amount,
          methodPayment: methodPayment,
          status: status,
          isRecurring: JSON.parse(JSON.stringify(isRecurring)),
        },
        select: {
          id: true,
          userId: true,
        },
      });

      return donation;
    } catch (error) {
      throw new BadRequestException("It was not possible to create the donation.");
    }
  }
}
