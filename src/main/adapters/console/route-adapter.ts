import { IConsoleRequest } from '../../../presentation/protocol/console';
import { IConsoleController } from '../../../presentation/protocol/console-controller';

export const adaptRoute = (
  controller: IConsoleController,
  controllerData: IConsoleRequest,
) => {
  return async (): Promise<void> => {
    const consoleResponse = await controller.handle(controllerData);
    console.log(consoleResponse);
  };
};
