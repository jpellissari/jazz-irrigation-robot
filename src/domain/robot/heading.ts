import { Either, left, right } from '../../core/either';
import { InvalidHeadingError } from './errors/invalid-heading-error';

export class Heading {
  private heading: string;

  private constructor(heading: string) {
    this.heading = heading;
  }

  get value(): string {
    return this.heading;
  }

  static create(heading: string): Either<InvalidHeadingError, Heading> {
    const validHeadings = ['N', 'S', 'L', 'O'];

    if (!validHeadings.includes(heading.toUpperCase())) {
      return left(new InvalidHeadingError());
    }

    return right(new Heading(heading));
  }
}
