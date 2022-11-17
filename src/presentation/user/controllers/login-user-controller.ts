import { LoginUserUseCase } from '../../../domain/user';
import { Controller } from '../../contracts';
import { HttpResponse } from '../../types';

export class LoginUserController implements Controller {
  constructor(private loginUserUseCase: LoginUserUseCase) {}

  async handle(request: any): Promise<HttpResponse> {
    try {
      const user = await this.loginUserUseCase.execute({
        email: request.email,
        password: request.password,
      });

      return {
        statusCode: 200,
        body: user,
      };
    } catch (err: any) {
      return {
        statusCode: 400,
        body: err?.message,
      };
    }
  }
}
