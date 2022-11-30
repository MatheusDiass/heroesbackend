import { describe, expect, it } from 'vitest';
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
        user: process.env.VITE_EMAIL_PROVIDER_USER,
        pass: process.env.VITE_EMAIL_PROVIDER_PASSWORD,
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

describe('Mail Provider', () => {
  it('should return the message id after sending the email', async () => {
    const message = {
      to: {
        name: 'Test',
        email: 'test@test.com',
      },
      from: {
        name: 'Team Heroes',
        email: 'teamheroes@heroes.com',
      },
      subject: 'Welcome to Heroes World',
      body: 'Welcome to Heroes World',
    };

    const sut = new MailProvider();
    const messageId = await sut.sendMail(message);

    expect(messageId).toBeTypeOf('string');
  });
});
