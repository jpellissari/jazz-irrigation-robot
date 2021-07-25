import { Either, left, right } from '../../core/either';
import { Garden } from '../garden/garden';
import { sizeType } from '../garden/size';
import { Coordinate, coordinateType } from '../shared/coordinate';
import { InvalidCoordinateError } from '../shared/errors/invalid-coordinate-error';
import { InvalidHeadingError } from './errors/invalid-heading-error';
import { OutOfBoundsError } from './errors/out-of-bounds-error';
import { Heading } from './heading';

export class Robot {
  private _heading: Heading;
  private _position: Coordinate;
  private _garden: Garden;
  private _movements: string[];

  private constructor(heading: Heading, position: Coordinate, garden: Garden) {
    this._heading = heading;
    this._position = position;
    this._garden = garden;
    this._movements = [];
  }

  get heading(): string {
    return this._heading.value;
  }

  changeHeading(heading: string): Either<InvalidHeadingError, void> {
    const headingOrError = Heading.create(heading);

    if (headingOrError.isLeft()) {
      return left(new InvalidHeadingError());
    }

    this._heading = headingOrError.value;

    return right();
  }

  get position(): coordinateType {
    return this._position.value;
  }

  get gardenSize(): sizeType {
    return this._garden.size.value;
  }

  get movements(): string[] {
    return this._movements;
  }

  move(): Either<OutOfBoundsError | InvalidHeadingError, void> {
    switch (this.heading) {
      case 'N':
        return this.moveNorth();
      case 'S':
        return this.moveSouth();
      case 'L':
        return this.moveEast();
      case 'O':
        return this.moveWest();
    }
  }

  private moveNorth(): Either<OutOfBoundsError | InvalidCoordinateError, void> {
    const currentPosition = this.position;
    const newPositionOrError = Coordinate.create(
      currentPosition.x,
      currentPosition.y + 1,
    );

    if (newPositionOrError.isLeft()) {
      return left(new InvalidCoordinateError());
    }

    const newPosition = newPositionOrError.value;

    if (newPosition.value.y > this.gardenSize.height - 1) {
      return left(new OutOfBoundsError());
    }

    this._movements.push('N');
    this._position = newPosition;
    return right();
  }

  private moveSouth(): Either<OutOfBoundsError, void> {
    const currentPosition = this.position;
    const newPositionOrError = Coordinate.create(
      currentPosition.x,
      currentPosition.y - 1,
    );

    if (newPositionOrError.isLeft()) {
      return left(new OutOfBoundsError());
    }

    const newPosition = newPositionOrError.value;

    if (newPosition.value.y < 0) {
      return left(new OutOfBoundsError());
    }

    this._movements.push('S');
    this._position = newPosition;
    return right();
  }

  private moveEast(): Either<OutOfBoundsError, void> {
    const currentPosition = this.position;
    const newPositionOrError = Coordinate.create(
      currentPosition.x + 1,
      currentPosition.y,
    );

    if (newPositionOrError.isLeft()) {
      return left(new OutOfBoundsError());
    }

    const newPosition = newPositionOrError.value;

    if (newPosition.value.x > this.gardenSize.width - 1) {
      return left(new OutOfBoundsError());
    }

    this._movements.push('L');
    this._position = newPosition;
    return right();
  }

  private moveWest(): Either<OutOfBoundsError, void> {
    const currentPosition = this.position;
    const newPositionOrError = Coordinate.create(
      currentPosition.x - 1,
      currentPosition.y,
    );

    if (newPositionOrError.isLeft()) {
      return left(new OutOfBoundsError());
    }

    const newPosition = newPositionOrError.value;

    if (newPosition.value.x < 0) {
      return left(new OutOfBoundsError());
    }

    this._movements.push('O');
    this._position = newPosition;
    return right();
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
