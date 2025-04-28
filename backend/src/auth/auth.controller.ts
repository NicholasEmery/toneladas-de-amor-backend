import { Body, Controller, HttpCode, Post, Headers } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignInDto } from "./dto/signIn.dto";
import { RefreshTokenDto } from "./dto/refreshToken.dto";
import {
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("signin")
  @HttpCode(200)
  @ApiOperation({ summary: "Login de usuário" })
  @ApiBody({ type: SignInDto })
  @ApiResponse({
    status: 200,
    example: { message: "Usuário autenticado com sucesso.", statusCode: 200 },
  })
  @ApiResponse({
    status: 400,
    example: {
      message: "Dados não podem ser enviados vazios",
      error: "Bad Request",
      statusCode: 400,
    },
  })
  @ApiResponse({
    status: 401,
    example: {
      message: "Credenciais inválidas",
      error: "Unauthorized",
      statusCode: 401,
    },
  })
  @ApiResponse({
    status: 404,
    example: {
      message: "Usuário não existe",
      error: "Not Found",
      statusCode: 404,
    },
  })
  async signin(@Body() data: SignInDto) {
    const { access_token, refresh_token } = await this.authService.signin(data);

    return {
      message: "Usuário autenticado com sucesso.",
      access_token,
      refresh_token,
      statusCode: 200,
    };
  }

  @Post("refresh-token")
  @HttpCode(200)
  @ApiOperation({ summary: "Atualiza o token de autenticação" })
  @ApiResponse({
    status: 200,
    example: { message: "Token atualizado com sucesso.", statusCode: 200 },
  })
  @ApiResponse({
    status: 401,
    example: {
      message: "Token inválido ou expirado",
      error: "Unauthorized",
      statusCode: 401,
    },
  })
  async refreshToken(@Headers('authorization') authHeader: string) {
    const refresh_token = authHeader?.split(' ')[1]; // Extrai o token do header Authorization
    
    const { accessToken, refreshToken } =
      await this.authService.refreshToken(refresh_token);

    return {
      message: "Token atualizado com sucesso.",
      access_token: accessToken,
      refresh_token: refreshToken,
      statusCode: 200,
    };
  }

  @Post("logout")
  @HttpCode(200)
  async logout(@Headers('authorization') authHeader: string) {
    const refreshToken = authHeader?.split(' ')[1]; // Extrai o token do header Authorization

    await this.authService.logout(refreshToken); // Chama o serviço de logout

    return {
      message: "Usuário deslogado com sucesso.",
      statusCode: 200,
    };
  }
}
