import { Controller, Post, Body, HttpCode, UseGuards } from "@nestjs/common";
import { CreateUserUpheldDto } from "../dto/createUser/createUserUpheld.dto";
import { CreateUserDonatorDto } from "../dto/createUser/createUserDonator.dto";
import { CreateUserColaboratorDto } from "../dto/createUser/createUserColaborator.dto";
import { CreateUserAdminDto } from "../dto/createUser/createUserAdmin.dto";
import { CreateUserService } from "./create-user.service";
import { ApiBadRequestResponse, ApiBearerAuth, ApiOperation } from "@nestjs/swagger";
import { Roles } from "src/auth/roles.decorator";
import { RolesGuard } from "src/auth/roles.guard";
import { Role } from "@prisma/client";

@Controller("create-user")
export class CreateUserController {
  constructor(private readonly createUserService: CreateUserService) {}

  @ApiOperation({
    summary: "Cria um usuário com cargo 'UPHELD'",
  })
  @ApiBadRequestResponse({
    description: "User already exists",
    example: {
      message: "User already exists",
      error: "Bad Request",
      statusCode: 400,
    },
  })
  @Post("upheld")
  @HttpCode(201)
  async createUserUpheld(@Body() createUserUpheldDto: CreateUserUpheldDto): Promise<{
    success: string;
    message: string;
    statusCode: number;
  }> {
    await this.createUserService.createUserUpheld(createUserUpheldDto);
    return {
      success: "Usuário criado com sucesso.",
      message: "Verifique o e-mail para ativar a conta.",
      statusCode: 201,
    };
  }

  @ApiOperation({
    summary: "Cria um usuário com cargo 'DONATOR'",
  })
  @ApiBadRequestResponse({
    description: "User already exists",
    example: {
      message: "User already exists",
      error: "Bad Request",
      statusCode: 400,
    },
  })
  @Post("donator")
  @HttpCode(201)
  async createUserDonator(@Body() createUserDonatorDto: CreateUserDonatorDto): Promise<{
    success: string;
    message: string;
    statusCode: number;
  }> {
    await this.createUserService.createUserDonator(createUserDonatorDto);
    return {
      success: "Usuário criado com sucesso.",
      message: "Verifique o e-mail para ativar a conta.",
      statusCode: 201,
    };
  }

  @ApiOperation({
    summary: "Cria um usuário com cargo 'COLABORATOR'",
  })
  @ApiBadRequestResponse({
    description: "User already exists",
    example: {
      message: "User already exists",
      error: "Bad Request",
      statusCode: 400,
    },
  })
  @ApiBearerAuth()
  @Post("colaborator")
  @HttpCode(201)
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  async createUserColaborator(@Body() createUserColaboratorDto: CreateUserColaboratorDto): Promise<{
    success: string;
    message: string;
    statusCode: number;
  }> {
    await this.createUserService.createUserColaborator(createUserColaboratorDto);
    return {
      success: "Usuário criado com sucesso.",
      message: "Verifique o e-mail para ativar a conta.",
      statusCode: 201,
    };
  }

  @ApiOperation({
    summary: "Cria um usuário com cargo 'ADMIN'",
  })
  @ApiBadRequestResponse({
    description: "User already exists",
    example: {
      message: "User already exists",
      error: "Bad Request",
      statusCode: 400,
    },
  })
  @Post("admin")
  @HttpCode(201)
  async createUserAdmin(@Body() createUserAdminDto: CreateUserAdminDto): Promise<{
    success: string;
    message: string;
    statusCode: number;
  }> {
    await this.createUserService.createUserAdmin(createUserAdminDto);
    return {
      success: "Usuário criado com sucesso.",
      message: "Verifique o e-mail para ativar a conta.",
      statusCode: 201,
    };
  }
}
