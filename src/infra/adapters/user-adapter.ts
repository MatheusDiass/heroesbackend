import { User } from '../../domain/user';

export abstract class UserAdapter {
  //Maps json to a user entity
  static fromJson(obj: any): User {
    return new User({
      id: obj.user_id,
      name: obj.user_name,
      lastName: obj.user_lastname,
      nickname: obj.user_nickname,
      email: obj.user_email,
      password: obj.user_password,
      bio: obj.user_bio,
      confirmationCode: obj.user_confirmationcode,
    });
  }

  //Maps user entity to a JSON
  static toJson(user: User): any {
    return {
      user_id: user.getId,
      user_name: user.getName,
      user_lastname: user.getLastName,
      user_nickname: user.getNickname,
      user_email: user.getEmail,
      user_password: user.getPassword,
      user_bio: user.getBio,
      user_confirmationcode: user.getConfirmationCode,
    };
  }
}
