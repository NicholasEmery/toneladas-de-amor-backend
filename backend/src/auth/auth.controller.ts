import {
  Body,
  Controller,
  HttpCode,
  Inject,
  Post,
  Res,
  Req,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signIn.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  @Inject()
  private readonly authService: AuthService;

  @Post('signin')
  @HttpCode(200)
  @ApiOperation({ summary: 'Login de usuário' })
  @ApiBody({ type: SignInDto })
  @ApiResponse({
    status: 200,
    example: { message: 'Usuário autenticado com sucesso.', statusCode: 200 },
  })
  @ApiResponse({
    status: 400,
    example: {
      message: 'Dados não podem ser enviados vazios',
      error: 'Bad Request',
      statusCode: 400,
    },
  })
  @ApiResponse({
    status: 401,
    example: {
      message: 'Credenciais inválidas',
      error: 'Unauthorized',
      statusCode: 401,
    },
  })
  @ApiResponse({
    status: 404,
    example: {
      message: 'Usuário não existe',
      error: 'Not Found',
      statusCode: 404,
    },
  })
  async signin(@Body() data: SignInDto, @Res() res: Response) {
    const { access_token } = await this.authService.signin(data);

    // Configura o cookie com o access_token
    res.cookie('access_token', access_token, {
      httpOnly: true, // Impede acesso ao cookie via JavaScript
      // secure: true, // Garante que o cookie só será enviado em conexões HTTPS
      sameSite: 'strict', // Protege contra ataques CSRF
      maxAge: 30 * 24 * 60 * 60 * 1000, // Expira em 30 dias
    });

    res.send({
      message: 'Usuário autenticado com sucesso.',
      statusCode: 200,
    });
  }
  
  @Post('logout')
  @HttpCode(200)
  async logout(@Req() req, @Res() res: Response) {
    const cookie = req.cookies['access_token']; // Obtém o token JWT do cookie

    await this.authService.logout(cookie); // Chama o serviço de logout

    // Remove o cookie de autenticação
    res.clearCookie('access_token', {
      httpOnly: true,
      sameSite: 'strict',
    });

    res.send({
      message: 'Logged out successfully',
      statusCode: 200,
    });
  }
}
