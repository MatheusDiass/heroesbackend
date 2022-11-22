import { FetchFavoriteByIdUseCase } from '../../../domain/favorite';
import { Controller } from '../../contracts';
import { HttpResponse } from '../../types';

export class FetchFavoriteByIdController implements Controller {
  constructor(private fetchFavoriteByIdUseCase: FetchFavoriteByIdUseCase) {}

  async handle(request: any): Promise<HttpResponse> {
    try {
      const favorite = await this.fetchFavoriteByIdUseCase.execute(request);

      return {
        statusCode: 200,
        body: favorite,
      };
    } catch (err: any) {
      return {
        statusCode: 400,
        body: err?.message,
      };
    }
  }
}
