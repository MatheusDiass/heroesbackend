import { FetchHeroesUseCase } from '../../../domain/hero';
import { Controller } from '../../contracts';
import { HttpResponse } from '../../types';

export class FetchHeroesController implements Controller {
  constructor(private fetchHeroesUseCase: FetchHeroesUseCase) {}

  async handle(request: any): Promise<HttpResponse> {
    try {
      const filter = {
        nameStartsWith: request.nameStartsWith,
        limit: request.limit,
        offset: request.offset,
      };

      const heroes = await this.fetchHeroesUseCase.execute(filter);

      return {
        statusCode: 200,
        body: heroes,
      };
    } catch (err: any) {
      return {
        statusCode: 400,
        body: err?.message,
      };
    }
  }
}
