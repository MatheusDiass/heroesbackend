import { RegisterUserUseCase, User } from '../../../../domain/modules/user';
import { Controller } from '../../../contracts';
import { HttpResponse } from '../../../types';
import { RegisterUserResponse } from '../types';

export class RegisterUserController implements Controller {
  constructor(private readonly registerUserUseCase: RegisterUserUseCase) {}

  async handle(request: any): Promise<HttpResponse<RegisterUserResponse>> {
    try {
      const registerData = new User({
        ...request,
      });

      const user = await this.registerUserUseCase.execute(registerData);

      return {
        statusCode: 201,
        body: {
          id: user.getId || 0,
          name: user.getName,
          lastname: user.getLastName,
          nickname: user.getNickname || '',
          email: user.getEmail,
        },
      };
    } catch (err: any) {
      return {
        statusCode: 400,
        body: err?.message,
      };
    }
  }
}
