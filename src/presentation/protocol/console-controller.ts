import { IConsoleRequest, IConsoleResponse } from './console';

export interface IConsoleController {
  handle(request: IConsoleRequest): Promise<IConsoleResponse>;
}
