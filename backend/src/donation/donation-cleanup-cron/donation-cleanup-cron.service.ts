import { Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { PrismaService } from "src/database/prisma.service";

@Injectable()
export class DonationCleanupCronService {
  constructor(private readonly prisma: PrismaService) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async deleteExpiredDonations() {
    // Data atual em UTC, zerando horas/minutos/segundos
    const now = new Date();
    const todayUTC = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));

    // Busca todas as doações
    const donations = await this.prisma.donation.findMany();

    // Filtra as doações recorrentes cuja dateFinalized (em UTC) já passou (apenas datas anteriores ao dia de hoje)
    const expiredDonationIds = donations
      .filter((donation) => {
        const isRecurring = donation.isRecurring;
        if (
          !isRecurring ||
          typeof isRecurring !== "object" ||
          Array.isArray(isRecurring) ||
          !("dateFinalized" in isRecurring)
        ) {
          return false;
        }
        const dateFinalized = (isRecurring as { dateFinalized?: string | Date }).dateFinalized;
        if (!dateFinalized) return false;
        // Considera apenas ano, mês e dia (UTC)
        const finalizedUTC = new Date(dateFinalized);
        const finalizedDayUTC = new Date(
          Date.UTC(finalizedUTC.getUTCFullYear(), finalizedUTC.getUTCMonth(), finalizedUTC.getUTCDate()),
        );
        // Exclui apenas se finalizedDayUTC < todayUTC (ou seja, já passou)
        return finalizedDayUTC < todayUTC;
      })
      .map((donation) => donation.id);

    if (expiredDonationIds.length === 0) {
      return;
    }

    // Remove as doações expiradas
    await this.prisma.donation.deleteMany({
      where: {
        id: { in: expiredDonationIds },
      },
    });
  }
}
