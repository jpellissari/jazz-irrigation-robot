import {
  IConsoleRequest,
  IConsoleResponse,
} from '../../../presentation/protocol/console';
import { ICreateRobotUseCase } from '../../protocols/create-robot-use-case';

export class CreateRobotController {
  constructor(private readonly createRobotUseCase: ICreateRobotUseCase) {}

  async handle({
    body: { initialPosition, initialHeading },
  }: IConsoleRequest): Promise<IConsoleResponse> {
    const robotOrError = await this.createRobotUseCase.execute({
      initialHeading,
      initialPosition,
    });

    if (robotOrError.isLeft()) {
      return { statusCode: 400, body: robotOrError.value };
    }

    return { statusCode: 201 };
  }
}
