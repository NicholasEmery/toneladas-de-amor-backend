jest.mock("nodemailer");
import { sendMailMock } from "../../../__mocks__/nodemailer";

type MailServiceVerifiedEmailType = typeof import("./mail-verified-email.service").MailServiceVerifiedEmail;

describe("MailServiceVerifiedEmail", () => {
  let service: InstanceType<MailServiceVerifiedEmailType>;
  let MailServiceVerifiedEmail: MailServiceVerifiedEmailType;

  beforeEach(async () => {
    jest.resetModules();
    process.env.EMAIL_HOST = "smtp.example.com";
    process.env.EMAIL_PORT = "587";
    process.env.EMAIL_USER = "user@example.com";
    process.env.EMAIL_PASSWORD = "password";
    sendMailMock.mockReset();
    sendMailMock.mockResolvedValue(undefined);
    ({ MailServiceVerifiedEmail } = await import("./mail-verified-email.service"));
    service = new MailServiceVerifiedEmail();
  });

  afterEach(() => {
    jest.clearAllMocks();
    delete process.env.EMAIL_HOST;
    delete process.env.EMAIL_PORT;
    delete process.env.EMAIL_USER;
    delete process.env.EMAIL_PASSWORD;
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("deve enviar e-mail de verificação com sucesso", async () => {
    await expect(service.sendMail("destinatario@example.com", "123456")).resolves.toBeUndefined();
    expect(sendMailMock).toHaveBeenCalledWith({
      from: process.env.EMAIL_USER,
      to: "destinatario@example.com",
      subject: "Seu código de verificação",
      text: "Seu código de verificação é: 123456",
    });
  });

  it("deve lançar erro se variáveis de ambiente não estiverem definidas", async () => {
    delete process.env.EMAIL_HOST;
    ({ MailServiceVerifiedEmail } = await import("./mail-verified-email.service"));
    expect(() => new MailServiceVerifiedEmail()).toThrow("Configurações de e-mail não estão definidas no ambiente.");
  });

  it("deve propagar erro do sendMail", async () => {
    sendMailMock.mockRejectedValueOnce(new Error("Falha ao enviar"));
    await expect(service.sendMail("destinatario@example.com", "123456")).rejects.toThrow("Falha ao enviar");
  });
});
