import { Either, left, right } from '../../../core/either';
import { InvalidHeadingError } from '../../../domain/robot/errors/invalid-heading-error';
import { CreateRobotDTO, Robot } from '../../../domain/robot/robot';
import { InvalidCoordinateError } from '../../../domain/shared/errors/invalid-coordinate-error';
import { ISaveRobotRepository } from '../../../repositories/save-robot';
import { ICreateRobotUseCase } from '../../protocols/create-robot-use-case';

export class CreateRobotUseCase implements ICreateRobotUseCase {
  constructor(private readonly saveRobotRepository: ISaveRobotRepository) {}

  async execute({
    garden,
    initialHeading,
    initialPosition,
  }: CreateRobotDTO): Promise<
    Either<InvalidHeadingError | InvalidCoordinateError, Robot>
  > {
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
