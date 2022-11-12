import { ICodeGenerator } from './contract/code-generator';

export class CodeGenerator implements ICodeGenerator {
  generateCode(): number {
    return Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
  }
}
