import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Product } from "@prisma/client";
import { PrismaService } from "src/database/prisma.service";

@Injectable()
export class ProductService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async createProduct(data: {
    name: string;
    stockQuant: number;
    category: string;
  }): Promise<Product> {
    if (!data.name || !data.stockQuant || !data.category) {
      throw new Error("Informe todos os dados obrigatórios.");
    }

    const product = await this.prisma.product.create({
      data: data,
    });

    if (!product) {
      throw new Error("Erro ao criar o produto.");
    }

    return product;
  }
}
