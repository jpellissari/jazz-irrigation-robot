import { Either, left, right } from '../../../core/either';
import { InvalidHeadingError } from '../../../domain/robot/errors/invalid-heading-error';
import { CreateRobotDTO, Robot } from '../../../domain/robot/robot';
import { InvalidCoordinateError } from '../../../domain/shared/errors/invalid-coordinate-error';
import { GardenNotCreatedError } from '../../../presentation/errors/garden-not-created-error';
import { IGetGardenRepository } from '../../../repositories/get-garden';
import { ISaveRobotRepository } from '../../../repositories/save-robot';
import { ICreateRobotUseCase } from '../../protocols/create-robot-use-case';

export class CreateRobotUseCase implements ICreateRobotUseCase {
  constructor(
    private readonly getGardenRepository: IGetGardenRepository,
    private readonly saveRobotRepository: ISaveRobotRepository,
  ) {}

  async execute({
    initialHeading,
    initialPosition,
  }: Omit<CreateRobotDTO, 'garden'>): Promise<
    Either<
      InvalidHeadingError | InvalidCoordinateError | GardenNotCreatedError,
      Robot
    >
  > {
    const garden = await this.getGardenRepository.get();
    if (!garden) {
      return left(new GardenNotCreatedError());
    }

    const robotOrError = Robot.create({
      garden,
      initialPosition,
      initialHeading,
    });

    if (robotOrError.isLeft()) {
      return left(robotOrError.value);
    }

    const robot = robotOrError.value;
    await this.saveRobotRepository.save(robot);

    return right();
  }
}
