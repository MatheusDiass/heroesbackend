import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import { IMailProvider, Message } from './';

export class MailProvider implements IMailProvider {
  private transporter: Mail;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      auth: {
        user: process.env.EMAIL_PROVIDER_USER,
        pass: process.env.EMAIL_PROVIDER_PASSWORD,
      },
    });
  }

  async sendMail(message: Message): Promise<string> {
    const info = await this.transporter.sendMail({
      to: {
        name: message.to.name,
        address: message.to.email,
      },
      from: {
        name: message.from.name,
        address: message.to.email,
      },
      subject: message.subject,
      html: message.body,
    });

    return info.messageId;
  }
}
