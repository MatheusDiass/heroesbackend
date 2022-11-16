import { Request, Response } from 'express';
import { Controller } from '../../presentation/contracts';

export const expressAdapter = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const request = {
      ...req.body,
    };

    const response = await controller.handle(request);

    res.status(response.statusCode).json(response.body);
  };
};
