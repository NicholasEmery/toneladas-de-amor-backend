import {
  Controller,
  Patch,
  HttpCode,
  UseGuards,
  Body,
  Request,
} from "@nestjs/common";
import { UpdateUserService } from "./update-user.service";
import { UpdateUserUpheldDto } from "../dto/updateUser/updateUserUpheld.dto";
import { AuthGuard } from "src/auth/auth.guard";
import { UpdateUserDonatorDto } from "../dto/updateUser/updateUserDonator.dto";
import { UpdateUserColaboratorDto } from "../dto/updateUser/updateUserColaborator.dto";
import { UpdateUserAdminDto } from "../dto/updateUser/updateUserAdmin.dto";
import { User } from "@prisma/client";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";

@Controller("update-user")
export class UpdateUserController {
  constructor(private readonly updateUserService: UpdateUserService) {}

  @ApiOperation({
    summary: "Atualiza os dados do usuário com cargo 'UPHELD'",
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
  @Patch("upheld")
  @HttpCode(200)
  @UseGuards(AuthGuard)
  async updateUser(
    @Request() req: any,
    @Body() updateUserUpheldDto: UpdateUserUpheldDto,
  ): Promise<{ success: string; statusCode: number; user: User }> {
    const userId = req.user.id;
    const user = await this.updateUserService.updateUserUpheld(
      userId,
      updateUserUpheldDto,
    );

    return {
      success: "Usuário atualizado com sucesso.",
      user,
      statusCode: 200,
    };
  }

  @ApiOperation({
    summary: "Atualiza os dados do usuário com cargo 'DONATOR'",
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
  @Patch("donator")
  @HttpCode(200)
  @UseGuards(AuthGuard)
  async updateUserDonator(
    @Request() req: any,
    @Body() updateUserDonatorDto: UpdateUserDonatorDto,
  ): Promise<{ success: string; statusCode: number; user: User }> {
    const userId = req.user.id;
    const user = await this.updateUserService.updateUserDonator(
      userId,
      updateUserDonatorDto,
    );
    return {
      success: "Usuário atualizado com sucesso.",
      user,
      statusCode: 200,
    };
  }

  @ApiOperation({
    summary: "Atualiza os dados do usuário com cargo 'COLABORATOR'",
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
  @Patch("colaborator")
  @HttpCode(200)
  @UseGuards(AuthGuard)
  async updateUserColaborator(
    @Request() req: any,
    @Body() updateUserColaboratorDto: UpdateUserColaboratorDto,
  ): Promise<{ success: string; statusCode: number; user: User }> {
    const userId = req.user.id;
    const user = await this.updateUserService.updateUserColaborator(
      userId,
      updateUserColaboratorDto,
    );
    return {
      success: "Usuário atualizado com sucesso.",
      user,
      statusCode: 200,
    };
  }

  @ApiOperation({
    summary: "Atualiza os dados do usuário com cargo 'ADMIN'",
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
  @Patch("admin")
  @HttpCode(200)
  @UseGuards(AuthGuard)
  async updateUserAdmin(
    @Request() req: any,
    @Body() updateUserAdminDto: UpdateUserAdminDto,
  ): Promise<{ success: string; statusCode: number; user: User }> {
    const userId = req.user.id;
    const user = await this.updateUserService.updateUserAdmin(
      userId,
      updateUserAdminDto,
    );
    return {
      success: "Usuário atualizado com sucesso.",
      user,
      statusCode: 200,
    };
  }
}
