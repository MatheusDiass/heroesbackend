import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import { IMailProvider, Message } from './';

export class MailProvider implements IMailProvider {
  private transporter: Mail;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.mailtrap.io',
      port: 587,
      auth: {
        user: '8c24d2cebecfa9',
        pass: 'c7d3f9a75c9e87',
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
