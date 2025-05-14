import {
  Controller,
  Get,
  HttpCode,
  UseGuards,
  Param,
  Body,
  Request,
} from "@nestjs/common";
import { Role, User } from "@prisma/client";
import { AuthGuard } from "src/auth/auth.guard";
import { GetUserService } from "./get-user.service";
import { GetUserByIdDto } from "../dto/getUser/getUserById.dto";
import { GetUserByEmailDto } from "../dto/getUser/getUserByEmail.dto";
import { GetUserByPhoneDto } from "../dto/getUser/getUserByPhone.dto";
import { GetUserByNameDto } from "../dto/getUser/getUserByName.dto";
import { GetUsersByRoleDto } from "../dto/getUser/getUsersByRole.dto";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { RolesGuard } from "src/auth/roles.guard";
import { Roles } from "src/auth/roles.decorator";

@Controller("get-user")
export class GetUserController {
  constructor(private readonly getUserService: GetUserService) {}

  @ApiOperation({
    summary: "Busca usuário por ID do token",
    description: "Busca usuário por ID do token",
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
  @Get("id-token")
  @HttpCode(200)
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard, AuthGuard)
  async getUserByIdToken(@Request() req: any): Promise<{
    success: string;
    user: User;
    statusCode: number;
  }> {
    const userId = req.user.id;

    const user = await this.getUserService.getUserById(userId);

    return {
      success: "Usuário encontrado com sucesso.",
      user,
      statusCode: 200,
    };
  }

  @ApiOperation({
    summary: "Busca todos os usuários",
    description: "Busca todos os usuários",
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
  @Get("all")
  @HttpCode(200)
  @UseGuards(AuthGuard)
  async getAllUsers(): Promise<{
    success: string;
    users: User[];
    statusCode: number;
  }> {
    const users = await this.getUserService.getAllUsers();
    return {
      success: "Usuários encontrados com sucesso.",
      users,
      statusCode: 200,
    };
  }

  @ApiOperation({
    summary: "Busca usuário por ID",
    description: "Busca usuário por ID",
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
  @Get(":userId")
  @HttpCode(200)
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  async getUserById(@Param() getUserByIdDto: GetUserByIdDto): Promise<{
    success: string;
    user: User;
    statusCode: number;
  }> {
    const { userId } = getUserByIdDto;


    const user = await this.getUserService.getUserById(userId);

    return {
      success: "Usuário encontrado com sucesso.",
      user,
      statusCode: 200,
    };
  }

  @ApiOperation({
    summary: "Busca usuário por email",
    description: "Busca usuário por email",
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
  @Get("email")
  @HttpCode(200)
  @UseGuards(AuthGuard)
  async getUserByEmail(@Body() getUserByEmailDto: GetUserByEmailDto): Promise<{
    success: string;
    user: User;
    statusCode: number;
  }> {
    const { email } = getUserByEmailDto;

    const user = await this.getUserService.getUserByEmail(email);

    return {
      success: "Usuário encontrado com sucesso.",
      user,
      statusCode: 200,
    };
  }

  @ApiOperation({
    summary: "Busca usuário por telefone",
    description: "Busca usuário por telefone",
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
  @Get("phone")
  @HttpCode(200)
  @UseGuards(AuthGuard)
  async getUserByPhone(@Body() getUserByPhoneDto: GetUserByPhoneDto): Promise<{
    success: string;
    user: User;
    statusCode: number;
  }> {
    const { phone } = getUserByPhoneDto;

    const user = await this.getUserService.getUserByPhone(phone);

    return {
      success: "Usuário encontrado com sucesso.",
      user,
      statusCode: 200,
    };
  }

  @ApiOperation({
    summary: "Busca usuário por nome",
    description: "Busca usuário por nome",
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
  @Get("name")
  @HttpCode(200)
  @UseGuards(AuthGuard)
  async getUserByName(@Body() getUserByNameDto: GetUserByNameDto): Promise<{
    success: string;
    user: User;
    statusCode: number;
  }> {
    const { name } = getUserByNameDto;


    const user = await this.getUserService.getUserByName(name);

    return {
      success: "Usuário encontrado com sucesso.",
      user,
      statusCode: 200,
    };
  }

  @ApiOperation({
    summary: "Busca usuários por role",
    description: "Busca usuários por role",
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
  @Get("role")
  @HttpCode(200)
  @UseGuards(AuthGuard)
  async getUserByRole(@Body() getUserByRoleDto: GetUsersByRoleDto): Promise<{
    success: string;
    users: User[];
    statusCode: number;
  }> {
    const { role } = getUserByRoleDto;


    const users = await this.getUserService.getUserByRole(role);

    return {
      success: `Usuários com role: ${role} encontrados com sucesso.`,
      users,
      statusCode: 200,
    };
  }
}
