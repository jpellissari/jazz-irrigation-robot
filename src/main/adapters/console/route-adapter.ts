import { IConsoleRequest } from '../../../presentation/protocol/console';
import { IConsoleController } from '../../../presentation/protocol/console-controller';

export const adaptRoute = async (
  controller: IConsoleController,
  controllerData: IConsoleRequest,
): Promise<void> => {
  const consoleResponse = await controller.handle(controllerData);
  if (consoleResponse.statusCode > 299) {
    console.log(consoleResponse.body.message);
    return;
  }

  if (consoleResponse.statusCode === 201) {
    console.log('criado');
    return;
  }

  if (consoleResponse.statusCode === 200) {
    console.log(consoleResponse.body);
    return;
  }

  console.log(consoleResponse);
};
