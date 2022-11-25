import { FetchHeroByIdUseCase } from '../../../../domain/modules/hero';
import { Controller } from '../../../contracts';
import { HttpResponse } from '../../../types';

export class FetchHeroByIdController implements Controller {
  constructor(private fetchHeroByIdUseCase: FetchHeroByIdUseCase) {}

  async handle(request: any): Promise<HttpResponse> {
    try {
      const hero = await this.fetchHeroByIdUseCase.execute(request);

      return {
        statusCode: 200,
        body: hero,
      };
    } catch (err: any) {
      return {
        statusCode: 500,
        body: err?.message,
      };
    }
  }
}
