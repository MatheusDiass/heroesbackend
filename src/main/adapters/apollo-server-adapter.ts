import { Controller } from '../../presentation/contracts';

export const apolloServerAdapter = async (
  controller: Controller,
  args?: any
): Promise<any> => {
  let request = undefined;

  if (!(typeof args === 'object')) {
    request = args;
  } else {
    request = {
      ...args,
    };
  }

  const response = await controller.handle(request);

  return response.body;
};
