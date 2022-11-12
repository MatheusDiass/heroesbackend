import { describe, it, expect } from 'vitest';
import { Encrypter } from './';

describe('Encrypter', () => {
  it('should return true when comparing text with hash', async () => {
    const password = 'Test@@test1';
    const sut = new Encrypter();

    const hash = await sut.createHash(password);
    const comparisonResult = await sut.compareHash(password, hash);

    expect(comparisonResult).toBe(true);
  });

  it('should return false when comparing text with hash', async () => {
    const password = 'Test@@test1';
    const sut = new Encrypter();

    const hash = await sut.createHash(password);
    const comparisonResult = await sut.compareHash('Test@@t', hash);

    expect(comparisonResult).toBe(false);
  });
});
