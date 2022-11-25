import { AddFavoriteUseCase } from '../../../../domain/modules/favorite';
import { Controller } from '../../../contracts';
import { HttpResponse } from '../../../types';

export class AddFavoriteController implements Controller {
  constructor(private addFavoriteUseCase: AddFavoriteUseCase) {}

  async handle(request: any): Promise<HttpResponse> {
    try {
      await this.addFavoriteUseCase.execute(request);

      return {
        statusCode: 201,
        body: true,
      };
    } catch (err: any) {
      return {
        statusCode: 400,
        body: err?.message,
      };
    }
  }
}
