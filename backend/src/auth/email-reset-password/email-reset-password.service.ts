import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bycript from 'bcrypt';

@Injectable()
export class EmailResetPasswordService {

    @Inject()
    private readonly prisma: PrismaService;

    @Inject()
    private readonly jwtService: JwtService;

    async sendEmail(email: string): Promise<{ resetPasswordToken: string }> {
        const user = await this.prisma.user.findUnique({
            where: { email: email },
        });

        if (!user) throw new NotFoundException('Usuário não encontrado');

        const resetPasswordToken = await this.jwtService.signAsync(
            { sub: user.id },
            { secret: process.env.SECRET_KEY, expiresIn: '15m' }  // Token de reset de senha com expiração de 15 minutos
        );

        return { resetPasswordToken }
    }

    async verifyToken(token: string, password: string) {
        const payload = this.jwtService.verify(token, { secret: process.env.SECRET_KEY });
        const userId = payload.sub;
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) throw new NotFoundException('Usuário não encontrado');

        const newPassword = await bycript.hash(password, 10);
        

        await this.prisma.user.update({
            where: { id: userId },
            data: { password: newPassword },
        });
    }
}
