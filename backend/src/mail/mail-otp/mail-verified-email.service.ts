import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailServiceVerifiedEmail {
  private transporter: nodemailer.Transporter;

  constructor() {
    const host = process.env.EMAIL_HOST;
    const port = process.env.EMAIL_PORT;
    const user = process.env.EMAIL_USER;
    const pass = process.env.EMAIL_PASSWORD;

    if (!host || !port || !user || !pass) {
      throw new Error(
        'Configurações de e-mail não estão definidas no ambiente.',
      );
    }

    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST, // Servidor SMTP
      port: parseInt(port, 10), // Porta do servidor SMTP
      secure: false, // Use true para 465, false para outras portas
      auth: {
        user: process.env.EMAIL_USER, // E-mail do remetente
        pass: process.env.EMAIL_PASSWORD, // Senha do remetente
      },
    });
  }

  async sendMail(to: string, otp: string): Promise<void> {
    const mailOptions = {
      from: process.env.EMAIL_USER, // Remetente
      to, // Destinatário
      subject: 'Seu código de verificação', // Assunto do e-mail
      text: `Seu código de verificação é: ${otp}`, // Corpo do e-mail
    };

    await this.transporter.sendMail(mailOptions);
  }
}
