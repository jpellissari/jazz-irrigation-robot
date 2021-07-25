import { Either, left } from '../../core/either'
import { InvalidHeadingError } from './errors/invalid-heading-error'
import { Heading } from './heading'

export class Robot {
  private _heading: Heading

  private constructor (heading: Heading) {
    this._heading = heading
  }

  static create (heading: string): Either<InvalidHeadingError, Robot> {
    const headingOrError = Heading.create(heading)

    if (headingOrError.isLeft()) {
      return left(headingOrError.value)
    }
  }
}
