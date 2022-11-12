import { describe, it, expect } from 'vitest';
import { CodeGenerator } from './';

describe('Code Generator', () => {
  it('should return a number', () => {
    const sut = new CodeGenerator();
    const code = sut.generateCode();

    expect(code).toBeTypeOf('number');
  });

  it('should be six digits', () => {
    const sut = new CodeGenerator();
    const code = sut.generateCode();

    expect(code.toString()).toHaveLength(6);
  });
});
