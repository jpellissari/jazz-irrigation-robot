import { Either, left } from '../../core/either';
import { InvalidHeadingError } from './errors/invalid-heading-error';
import { Heading } from './heading';

type createRobotDTO = {
  heading: string;
};

export class Robot {
  private _heading: Heading;

  private constructor(heading: Heading) {
    this._heading = heading;
  }

  static create({
    heading,
  }: createRobotDTO): Either<InvalidHeadingError, Robot> {
    const headingOrError = Heading.create(heading);

    if (headingOrError.isLeft()) {
      return left(headingOrError.value);
    }
  }
}
