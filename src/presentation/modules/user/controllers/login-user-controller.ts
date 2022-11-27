import { LoginUserUseCase } from '../../../../domain/modules/user';
import { Controller } from '../../../contracts';
import { HttpResponse } from '../../../types';
import { LoginUserResponse } from '../types';

export class LoginUserController implements Controller {
  constructor(private readonly loginUserUseCase: LoginUserUseCase) {}

  async handle(request: any): Promise<HttpResponse<LoginUserResponse>> {
    try {
      const user = await this.loginUserUseCase.execute({
        email: request.email,
        password: request.password,
      });

      return {
        statusCode: 200,
        body: {
          id: user.getId || 0,
          name: user.getName,
          lastname: user.getLastName,
          nickname: user.getEmail,
          email: user.getEmail,
          bio: user.getBio || '',
          token: user.getToken || '',
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
