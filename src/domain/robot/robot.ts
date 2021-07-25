import { Either, left, right } from '../../core/either';
import { Garden } from '../garden/garden';
import { sizeType } from '../garden/size';
import { Coordinate, coordinateType } from '../shared/coordinate';
import { InvalidCoordinateError } from '../shared/errors/invalid-coordinate-error';
import { InvalidHeadingError } from './errors/invalid-heading-error';
import { Heading } from './heading';

export class Robot {
  private _heading: Heading;
  private _position: Coordinate;
  private _garden: Garden;

  private constructor(heading: Heading, position: Coordinate, garden: Garden) {
    this._heading = heading;
    this._position = position;
    this._garden = garden;
  }

  get heading(): string {
    return this._heading.value;
  }

  get position(): coordinateType {
    return this._position.value;
  }

  get gardenSize(): sizeType {
    return this._garden.size.value;
  }

  static create(
    garden: Garden,
  ): Either<InvalidHeadingError | InvalidCoordinateError, Robot> {
    const headingOrError = Heading.create('N');
    const positionOrError = Coordinate.create(0, 0);

    if (headingOrError.isLeft()) {
      return left(headingOrError.value);
    }
    if (positionOrError.isLeft()) {
      return left(positionOrError.value);
    }

    const heading = headingOrError.value;
    const position = positionOrError.value;

    return right(new Robot(heading, position, garden));
  }
}
