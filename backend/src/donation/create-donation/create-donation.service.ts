import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateDonationDto } from "../dto/createDonation/createDonation.dto";
import { PrismaService } from "src/database/prisma.service";

@Injectable()
export class CreateDonationService {
  constructor(private readonly prisma: PrismaService) {}

  async createDonation(createDonationDto: CreateDonationDto): Promise<boolean> {
    const { userId, amount, methodPayment, status, isRecurring } = createDonationDto;

    const existingUser = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      throw new BadRequestException("User Not Found");
    }

    const existingDonation = await this.prisma.donation.findUnique({
      where: { userId },
    });

    if (existingDonation) {
      throw new BadRequestException("Usuário já possui uma doação cadastrada.");
    }

    // Validação para doação recorrente
    const { recurringDonation, dateInitiated, dateFinalized } = isRecurring;

    if (recurringDonation === true) {
      if (!dateInitiated || !dateFinalized) {
        throw new BadRequestException("Para doações recorrentes, as datas de início e finalização são obrigatórias.");
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
        throw new BadRequestException("A data de início não pode ser anterior à data atual.");
      }

      // dateInitiated só pode ser do mês atual ou do mês subsequente
      if (
        !(
          (initiatedYear === nowYear && (initiatedMonth === nowMonth || initiatedMonth === nowMonth + 1)) ||
          // Caso especial: dezembro para janeiro do próximo ano
          (nowMonth === 11 && initiatedYear === nowYear + 1 && initiatedMonth === 0)
        )
      ) {
        throw new BadRequestException("A data de início deve ser no mês atual ou no próximo mês.");
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
          throw new BadRequestException(
            "A data de finalização deve ser exatamente o mês subsequente ao mês de início.",
          );
        }
      }
    }

    if (recurringDonation === false) {
      if (dateInitiated || dateFinalized) {
        throw new BadRequestException("Não envie datas se recurringDonation for false.");
      }
    }

    // Criação da doação
    await this.prisma.donation.create({
      data: {
        userId: userId,
        amount: amount,
        methodPayment: methodPayment,
        status: status,
        isRecurring: JSON.parse(JSON.stringify(isRecurring)),
      },
    });

    return true;
  }
}
