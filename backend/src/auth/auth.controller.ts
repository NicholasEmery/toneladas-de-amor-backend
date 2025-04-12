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

@Controller('auth')
export class AuthController {
  @Inject()
  private readonly authService: AuthService;

  @Post('signin')
  @HttpCode(200)
  async signin(
    @Body() data: SignInDto,
    @Res() res: Response,
  ) {
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
      statusCode: 200
    });
  }
}
