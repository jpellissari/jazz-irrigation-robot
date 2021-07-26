import { Either } from '../../core/either';
import { InvalidHeadingError } from '../../domain/robot/errors/invalid-heading-error';
import { CreateRobotDTO, Robot } from '../../domain/robot/robot';
import { InvalidCoordinateError } from '../../domain/shared/errors/invalid-coordinate-error';

export interface ICreateRobotUseCase {
  execute({
    initialHeading,
    initialPosition,
  }: Omit<CreateRobotDTO, 'garden'>): Promise<
    Either<InvalidHeadingError | InvalidCoordinateError, Robot>
  >;
}
