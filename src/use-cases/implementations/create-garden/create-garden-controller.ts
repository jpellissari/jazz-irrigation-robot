import {
  IConsoleRequest,
  IConsoleResponse,
} from '../../../presentation/protocol/console';
import { ICreateGardenUseCase } from '../../protocols/create-garden-use-case';

export class CreateGardenController {
  constructor(private readonly createGardenUseCase: ICreateGardenUseCase) {}

  async handle({
    body: { size, irrigablePatches },
  }: IConsoleRequest): Promise<IConsoleResponse> {
    const gardenOrError = await this.createGardenUseCase.execute({
      size,
      irrigablePatches,
    });

    if (gardenOrError.isLeft()) {
      return { statusCode: 400, body: gardenOrError.value };
    }

    const garden = gardenOrError.value;
    console.log(garden);
    return { statusCode: 201 };
  }
}
