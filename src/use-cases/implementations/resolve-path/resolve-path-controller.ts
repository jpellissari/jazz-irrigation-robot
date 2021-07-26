import {
  IConsoleRequest,
  IConsoleResponse,
} from '../../../presentation/protocol/console';
import { ICreateGardenUseCase } from '../../protocols/create-garden-use-case';
import { ICreateRobotUseCase } from '../../protocols/create-robot-use-case';
import { IResolvePathUseCase } from '../../protocols/resolve-path-use-case';

export class ResolvePathController {
  constructor(
    private readonly createGardenUseCase: ICreateGardenUseCase,
    private readonly createRobotUseCase: ICreateRobotUseCase,
    private readonly resolvePathUseCase: IResolvePathUseCase,
  ) {}

  async handle({
    body: { size, initialPosition, initialHeading, irrigablePatches },
  }: IConsoleRequest): Promise<IConsoleResponse> {
    const gardenOrError = await this.createGardenUseCase.execute({
      size,
      irrigablePatches,
    });

    if (gardenOrError.isLeft()) {
      return { statusCode: 400, body: gardenOrError.value };
    }

    const garden = gardenOrError.value;

    const robotOrError = await this.createRobotUseCase.execute({
      garden,
      initialHeading,
      initialPosition,
    });

    if (robotOrError.isLeft()) {
      return { statusCode: 400, body: robotOrError.value };
    }

    const robot = robotOrError.value;

    const resolvePath = await this.resolvePathUseCase.execute(robot);

    return { statusCode: 200, body: resolvePath };
  }
}
