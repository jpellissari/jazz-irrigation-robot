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

  get gardenIrrigablePatches(): coordinateType[] {
    return this._garden.irrigablePatchesCoordinates;
  }

  get movements(): string[] {
    return this._movements;
  }

  private setPosition(x: number, y: number): Either<OutOfBoundsError, void> {
    const newPositionOrError = Coordinate.create(x, y);

    if (newPositionOrError.isLeft()) {
      return left(new OutOfBoundsError());
    }

    const newPosition = newPositionOrError.value;

    if (
      newPosition.value.y > this.gardenSize.height - 1 ||
      newPosition.value.x > this.gardenSize.width - 1
    ) {
      return left(new OutOfBoundsError());
    }

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
    let foundIrrigablePatch: coordinateType;
    if (this.heading === ('N' || 'S')) {
      foundIrrigablePatch = this.gardenIrrigablePatches.filter(
        irrigablePatche => irrigablePatche.x === this.position.x,
      )[0];
    } else {
      foundIrrigablePatch = this.gardenIrrigablePatches.filter(
        irrigablePatche => irrigablePatche.y === this.position.y,
      )[0];
    }

    return foundIrrigablePatch ? right(foundIrrigablePatch) : left(false);
  }

  irrigatePatch(): void {
    const isIrrigable = this.gardenIrrigablePatches.some(
      irrigablePatch =>
        irrigablePatch.x === this._position.value.x &&
        irrigablePatch.y === this._position.value.y,
    );

    if (isIrrigable) {
      this._movements.push('I');
    }
  }

  move(): Either<OutOfBoundsError | InvalidHeadingError, void> {
    let newPositionOrError: Either<OutOfBoundsError, void>;
    const { x, y } = this.position;
    switch (this.heading) {
      case 'N':
        newPositionOrError = this.setPosition(x, y + 1);
        break;
      case 'S':
        newPositionOrError = this.setPosition(x, y - 1);
        break;
      case 'L':
        newPositionOrError = this.setPosition(x + 1, y);
        break;
      case 'O':
        newPositionOrError = this.setPosition(x - 1, y);
        break;
      default:
        return left(new InvalidHeadingError());
    }

    if (newPositionOrError.isLeft()) {
      return left(newPositionOrError.value);
    }

    this._movements.push('M');
    return right();
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
