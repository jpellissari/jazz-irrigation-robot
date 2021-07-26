import { Either } from '../../core/either';
import { Garden } from '../../domain/garden/garden';
import { InvalidHeadingError } from '../../domain/robot/errors/invalid-heading-error';
import { Robot } from '../../domain/robot/robot';
import { InvalidCoordinateError } from '../../domain/shared/errors/invalid-coordinate-error';

export interface ICreateRobotUseCase {
  execute(
    garden: Garden,
  ): Promise<Either<InvalidHeadingError | InvalidCoordinateError, Robot>>;
}
