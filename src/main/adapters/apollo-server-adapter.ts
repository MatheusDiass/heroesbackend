import { Controller } from '../../presentation/contracts';

export const apolloServerAdapter = async (
  controller: Controller,
  args?: any
): Promise<any> => {
  const request = {
    ...args,
  };

  const response = await controller.handle(request);

  return response.body;
};
