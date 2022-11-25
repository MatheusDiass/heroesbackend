import { ConfirmRegistrationUseCase } from '../../../../domain/modules/user';
import { Controller } from '../../../contracts';
import { HttpResponse } from '../../../types';

export class ConfirmRegistrationController implements Controller {
  constructor(
    private readonly confirmRegistrationUseCase: ConfirmRegistrationUseCase
  ) {}

  async handle(request: any): Promise<HttpResponse<any>> {
    try {
      await this.confirmRegistrationUseCase.execute({
        ...request,
      });

      return {
        statusCode: 200,
        body: 'Successfully confirmed registration!',
      };
    } catch (err: any) {
      return {
        statusCode: 400,
        body: err?.message,
      };
    }
  }
}
