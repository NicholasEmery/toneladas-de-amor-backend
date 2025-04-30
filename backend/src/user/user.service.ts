import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Prisma, Role, User } from "@prisma/client";
import { PrismaService } from "src/database/prisma.service";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { UserArgs } from "@prisma/client/runtime/library";

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async user(userWhereUniqueInput: Prisma.UserWhereUniqueInput): Promise<{
    name: string;
    email: string;
    telefone: string;
    endereco: string;
    role: Role;
  }> {
    const user = await this.prisma.user.findUnique({
      where: userWhereUniqueInput,
      select: {
        name: true,
        email: true,
        telefone: true,
        endereco: true,
        role: true,
      },
    });

    if (!user) {
      throw new NotFoundException("Usuário não encontrado.");
    }

    return user;
  }

  async createUser(data: {
    name: string;
    email: string;
    telefone: string;
    endereco: string;
    password: string;
    role: Role;
  }): Promise<User> {
    // Verifica se o usuário já existe
    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (user) {
      throw new Error("Usuário já existe com esse email.");
    }

    const hashPassword = await bcrypt.hash(data.password, 10);

    return await this.prisma.user.create({
      data: { ...data, password: hashPassword },
    });
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<{
    user: Omit<User, "password" | "otp" | "expiresOtpAt" | "createdAt">;
    message: string;
    statusCode: number;
  }> {
    const { where, data } = params;

    let successMessage: string;
    successMessage = "Dados atualizados com sucesso.";

    if (data.password) {
      if (Object.keys(data).length === 1 && data.password) {
        successMessage = "Senha atualizada com sucesso. Faça login novamente.";
      }
      data.password = await bcrypt.hash(data.password as string, 10);
      data.tokenVersion = { increment: 1 };
    }

    if (data.email) {
      if (Object.keys(data).length === 1 && data.email) {
        successMessage =
          "Email atualizado com sucesso. Status de verificação redefinido.";
      }
      data.emailVerified = false;
      data.tokenVersion = { increment: 1 };
    }

    try {
      const updatedUser = await this.prisma.user.update({
        where,
        data,
      });

      // Remove campos sensíveis
      const {
        password,
        otp,
        expiresOtpAt,
        createdAt,
        ...userWithoutSensitiveData
      } = updatedUser;

      return {
        user: userWithoutSensitiveData,
        message: successMessage,
        statusCode: 200,
      };
    } catch (error: any) {
      throw new Error("Erro ao atualizar o usuário." + error.message);
    }
  }

  async deleteUser(userId: string) {
    try {
      const user = await this.prisma.user.delete({
        where: { id: userId },
      }); 

      if (!user) {
        throw new NotFoundException("Usuário não encontrado.");
      }
    } catch (error: any) {
      throw new Error("Erro ao deletar o usuário." + error.message);
    }
  }
}
