import { describe, expect, it } from 'vitest';
import { User } from '../../../../domain/modules/user';
import { UserAdapter } from './user-adapter';

describe('User Adapter', () => {
  it('should maps a json to a user entity', () => {
    const userData = {
      user_id: 1,
      user_name: 'Test',
      user_lastname: 'Test',
      user_nickname: 'Test01',
      user_email: 'test@test.com',
      user_password: 'Test!!1010',
      user_bio: 'Bio description',
      user_confirmationcode: 1111,
    };

    const user = UserAdapter.fromJson(userData);

    expect(userData.user_id).toEqual(user.getId);
    expect(userData.user_name).toEqual(user.getName);
    expect(userData.user_lastname).toEqual(user.getLastName);
    expect(userData.user_nickname).toEqual(user.getNickname);
    expect(userData.user_email).toEqual(user.getEmail);
    expect(userData.user_password).toEqual(user.getPassword);
    expect(userData.user_bio).toEqual(user.getBio);
    expect(userData.user_confirmationcode).toEqual(user.getConfirmationCode);
  });

  it('should maps a user entity to a json', () => {
    const userData = new User({
      id: 1,
      name: 'Test',
      lastname: 'Test',
      nickname: 'Test01',
      email: 'test@test.com',
      password: 'Test!!1010',
      bio: 'Bio description',
      confirmationCode: 1111,
    });

    const user = UserAdapter.toJson(userData);

    expect(userData.getId).toEqual(user.user_id);
    expect(userData.getName).toEqual(user.user_name);
    expect(userData.getLastName).toEqual(user.user_lastname);
    expect(userData.getNickname).toEqual(user.user_nickname);
    expect(userData.getEmail).toEqual(user.user_email);
    expect(userData.getPassword).toEqual(user.user_password);
    expect(userData.getBio).toEqual(user.user_bio);
    expect(userData.getConfirmationCode).toEqual(user.user_confirmationcode);
  });
});
