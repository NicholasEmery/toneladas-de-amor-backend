import { Controller, Delete, Param, HttpCode, UseGuards } from "@nestjs/common";
import { DeleteUserService } from "./delete-user.service";
import { DeleteUserByIdDto } from "../dto/deleteUser/deleteUserById.dto";
import { RolesGuard } from "src/auth/roles.guard";
import { AuthGuard } from "src/auth/auth.guard";
import { Roles } from "src/auth/roles.decorator";
import { Role } from "@prisma/client";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";

@Controller("delete-user")
export class DeleteUserController {
  constructor(private readonly deleteUserService: DeleteUserService) {}

  @ApiOperation({
    summary: "Deleta usuário por ID",
  })
  @ApiUnauthorizedResponse({
    description: "Token inválido ou não fornecido",
    example: {
      message: "Token inválido ou não fornecido",
      error: "Unauthorized",
      statusCode: 401,
    },
  })
  @ApiBearerAuth()
  @Delete("by-id/:id")
  @HttpCode(200)
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard, AuthGuard)
  async deleteUser(
    @Param() deleteUserByIdDto: DeleteUserByIdDto,
  ): Promise<{ success: string; statusCode: number }> {
    const { userId } = deleteUserByIdDto;

    await this.deleteUserService.deleteUser(userId);

    return {
      success: "Usuário deletado com sucesso.",
      statusCode: 200,
    };
  }
}
