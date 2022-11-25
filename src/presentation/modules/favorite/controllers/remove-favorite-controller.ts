import { RemoveFavoriteUseCase } from '../../../../domain/modules/favorite';
import { Controller } from '../../../contracts';
import { HttpResponse } from '../../../types';

export class RemoveFavoriteController implements Controller {
  constructor(private readonly removeFavoriteUseCase: RemoveFavoriteUseCase) {}

  async handle(request: any): Promise<HttpResponse> {
    try {
      await this.removeFavoriteUseCase.execute(request);

      return {
        statusCode: 200,
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
