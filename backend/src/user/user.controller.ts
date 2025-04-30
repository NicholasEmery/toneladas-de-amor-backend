import {
  Body,
  Controller,
  Delete,
  Get,
  Request,
  Patch,
  Post,
  UseGuards,
  HttpCode,
  NotFoundException,
} from "@nestjs/common";
import { User, User as UserModel } from "@prisma/client";
import { UserService } from "./user.service";
import { AuthGuard } from "src/auth/auth.guard";
// import { RolesGuard } from 'src/auth/roles.guard';
// import { Roles } from 'src/auth/roles.decorator';
import { CreateUserDto } from "./dto/createUser.dto";
import { UpdateUserDto } from "./dto/updateUser.dto";
import { ApiBearerAuth, ApiHeader } from "@nestjs/swagger";

@Controller("user")
export class UserController {
  constructor(private userService: UserService) {}

  @Post("signup")
  @HttpCode(201)
  async signupUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<{ email: string; success: string; statusCode: number }> {
    const user = await this.userService.createUser(createUserDto);
    // Envia a resposta manualmente
    return {
      email: user.email,
      success: "Usuário criado com sucesso.",
      // accessToken: user.accessToken,
      // refreshToken: user.refreshToken,
      statusCode: 201,
    };
  }

  @Get("profile")
  @HttpCode(200)
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async getUser(@Request() req: any): Promise<{
    email: string;
    name: string;
    telefone: string;
    endereco: string;
    role: string;
  }> {
    const userId = req.user.id; // ID do usuário extraído do token
    return await this.userService.user({ id: userId });
  }

  @Patch("update")
  @HttpCode(200)
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async updateUser(
    @Body() userDataUpdate: UpdateUserDto,
    @Request() req: any,
  ): Promise<{
    message: string;
    statusCode: number;
  }> {
    const userId = req.user.id; // ID do usuário extraído do token

    // Chama o serviço para atualizar o usuário e retorna o resultado
    await this.userService.updateUser({
      where: { id: userId },
      data: userDataUpdate,
    });

    return {
      message: "Usuário atualizado com sucesso.",
      statusCode: 200,
    };
  }

  @Delete("delete")
  @HttpCode(200)
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async deleteUser(
    @Request() req: any,
  ): Promise<{ success: string; statusCode: number }> {
    const userId = req.user.id; // ID do usuário extraído do token
    await this.userService.deleteUser(userId);

    return {
      success: "Usuário deletado com sucesso.",
      statusCode: 200,
    };
  }
}
