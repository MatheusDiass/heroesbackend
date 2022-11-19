type Address = {
  name: string;
  email: string;
};

export type Message = {
  to: Address;
  from: Address;
  subject: string;
  body: string;
};

export interface IMailProvider {
  sendMail(message: Message): Promise<string>;
}
