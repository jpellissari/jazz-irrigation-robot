import {
  IConsoleRequest,
  IConsoleResponse,
} from '../../../presentation/protocol/console';
import { IResolvePathUseCase } from '../../protocols/resolve-path-use-case';

export class ResolvePathController {
  constructor(private readonly resolvePathUseCase: IResolvePathUseCase) {}

  async handle(request: IConsoleRequest): Promise<IConsoleResponse> {
    const resolvePath = await this.resolvePathUseCase.execute();

    return { statusCode: 200, body: resolvePath };
  }
}
