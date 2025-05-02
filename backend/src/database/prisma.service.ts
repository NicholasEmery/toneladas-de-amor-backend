import { Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async executeQuery<T>(query: () => Promise<T>): Promise<T> {
    try {
      return await query();
    } finally {
      await this.$disconnect();
      console.log("Disconnected DB")
    }
  }
}
