import { Either, left, right } from '../../core/either';
import { Garden } from '../garden/garden';
import { sizeType } from '../garden/size';
import { Coordinate, coordinateType } from '../shared/coordinate';
import { InvalidCoordinateError } from '../shared/errors/invalid-coordinate-error';
import { InvalidHeadingError } from './errors/invalid-heading-error';
import { OutOfBoundsError } from './errors/out-of-bounds-error';
import { Heading } from './heading';

export type CreateRobotDTO = {
  garden: Garden;
  initialPosition?: coordinateType;
  initialHeading?: string;
};

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
    this.irrigatePatch();
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

  get irrigablePatchesCoordinates(): Coordinate[] {
    return this._garden.patches
      .filter(patch => patch.isIrrigable)
      .map(patch => patch.coordinate);
  }

  get movements(): string[] {
    return this._movements;
  }

  private irrigatePatch(): void {
    const isIrrigable = this.irrigablePatchesCoordinates.some(
      irrigablePatch =>
        irrigablePatch.value.x === this._position.value.x &&
        irrigablePatch.value.y === this._position.value.y,
    );

    if (isIrrigable) {
      this._movements.push('I');
    }
  }

  private moveNorth(): Either<OutOfBoundsError, void> {
    const currentPosition = this.position;
    const newPositionOrError = Coordinate.create(
      currentPosition.x,
      currentPosition.y + 1,
    );

    if (newPositionOrError.isLeft()) {
      return left(new OutOfBoundsError());
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

  turnLeft(): Either<InvalidHeadingError, void> {
    const headingsOrder = ['N', 'O', 'S', 'L'];
    const headingIndex = headingsOrder.findIndex(
      heading => heading === this.heading,
    );

    const newHeading =
      headingIndex < headingsOrder.length - 1
        ? headingsOrder[headingIndex + 1]
        : headingsOrder[0];

    const headingOrError = Heading.create(newHeading);

    if (headingOrError.isLeft()) {
      return left(new InvalidHeadingError());
    }

    this._heading = headingOrError.value;
    this._movements.push('E');

    return right();
  }

  turnRight(): Either<InvalidHeadingError, void> {
    const headingsOrder = ['N', 'L', 'S', 'O'];
    const headingIndex = headingsOrder.findIndex(
      heading => heading === this.heading,
    );

    const newHeading =
      headingIndex < headingsOrder.length - 1
        ? headingsOrder[headingIndex + 1]
        : headingsOrder[0];

    const headingOrError = Heading.create(newHeading);

    if (headingOrError.isLeft()) {
      return left(new InvalidHeadingError());
    }

    this._heading = headingOrError.value;
    this._movements.push('D');

    return right();
  }

  searchIrrigablePatchOnHeading(): Either<false, coordinateType> {
    let foundIrrigablePatch: Coordinate;
    if (this.heading === ('N' || 'S')) {
      foundIrrigablePatch = this.irrigablePatchesCoordinates.filter(
        irrigablePatche => irrigablePatche.value.x === this.position.x,
      )[0];
    } else {
      foundIrrigablePatch = this.irrigablePatchesCoordinates.filter(
        irrigablePatche => irrigablePatche.value.y === this.position.y,
      )[0];
    }

    return foundIrrigablePatch ? right(foundIrrigablePatch.value) : left(false);
  }

  move(): Either<OutOfBoundsError | InvalidHeadingError, void> {
    let moveOrError: Either<OutOfBoundsError, void>;

    switch (this.heading) {
      case 'N':
        moveOrError = this.moveNorth();
        this.irrigatePatch();
        break;
      case 'S':
        moveOrError = this.moveSouth();
        this.irrigatePatch();
        break;
      case 'L':
        moveOrError = this.moveEast();
        this.irrigatePatch();
        break;
      case 'O':
        moveOrError = this.moveWest();
        this.irrigatePatch();
        break;
      default:
        return left(new InvalidHeadingError());
    }

    return moveOrError;
  }

  static create({
    garden,
    initialPosition = { x: 0, y: 0 },
    initialHeading = 'N',
  }: CreateRobotDTO): Either<
    InvalidHeadingError | InvalidCoordinateError,
    Robot
  > {
    const { x, y } = initialPosition;
    const headingOrError = Heading.create(initialHeading);
    const positionOrError = Coordinate.create(x, y);

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
