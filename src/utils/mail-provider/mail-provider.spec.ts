import { describe, expect, it } from 'vitest';
import { MailProvider } from './';

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
