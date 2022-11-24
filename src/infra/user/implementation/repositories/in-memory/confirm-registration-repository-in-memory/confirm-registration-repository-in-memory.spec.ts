import { describe, it, expect } from 'vitest';
import { ConfirmRegistrationRepositoryInMemory } from './confirm-registration-repository-in-memory';
import { FetchUserByIdRepositoryInMemory } from '../fetch-user-by-id-repository-in-memory/fetch-user-by-id-repository-in-memory';

describe('Confirm Resgistration Repository In-Memory', () => {
  it('should return confirmation code 0 after confirming registration', async () => {
    const sut = new ConfirmRegistrationRepositoryInMemory();
    await sut.confirmRegistration(1);

    const fetchUserByIdRepository = new FetchUserByIdRepositoryInMemory();
    const user = await fetchUserByIdRepository.fetchUserById(1);

    expect(user?.getConfirmationCode).toEqual(0);
  });
});
