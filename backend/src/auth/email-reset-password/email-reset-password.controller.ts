import { Body, Controller, HttpCode, Post, Res } from '@nestjs/common';
import { EmailResetPasswordService } from './email-reset-password.service';
import { SendEmailDto } from './dto/sendEmail.dto';
import { VerifyTokenDto } from './dto/verifyToken.dto';

@Controller('auth/reset/password')
export class EmailResetPasswordController {
    constructor(private readonly emailResetPasswordService: EmailResetPasswordService) {}

    @Post('send/email')
    @HttpCode(200)
    async sendEmail(@Body() sendEmailDto: SendEmailDto, @Res() res): Promise<{ success: string; statusCode: number }> {
        const resetPasswordToken = await this.emailResetPasswordService.sendEmail(sendEmailDto.email);

        res.cookie('resetPasswordToken', resetPasswordToken, {
            httpOnly: true,
            // secure: true,
            sameSite: 'strict',
            maxAge: 15 * 60 * 1000, // 15 minutos
        });

        return {
            success: 'Email enviado com sucesso.',
            statusCode: 200,
        };
    }

    @Post('verify/token')
    @HttpCode(200)
    async verifyToken(@Body() verifyTokenDto: VerifyTokenDto): Promise<{ success: string; statusCode: number }> {
        await this.emailResetPasswordService.verifyToken(verifyTokenDto.token, verifyTokenDto.password);

        return {
            success: 'Senha alterada com sucesso.',
            statusCode: 200,
        };
    }
}
