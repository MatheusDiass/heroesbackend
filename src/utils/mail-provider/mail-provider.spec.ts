import { describe, expect, it } from 'vitest';
import nodemailer from 'nodemailer';
import { IMailProvider, Message } from './contract/mail-provider';
import Mail from 'nodemailer/lib/mailer';

class MailProvider implements IMailProvider {
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
