export interface IToken {
  create(data: { [key: string]: any }): string;
  verify(token: string): any;
}
