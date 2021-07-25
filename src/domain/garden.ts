import { Either, left } from '../core/either'
import { InvalidSizeError } from './errors/invalid-size-error'
import { Size, sizeType } from './size'

export class Garden {
  private size: Size

  static create ({ width, height }: sizeType): Either<InvalidSizeError, Garden> {
    const sizeOrError = Size.create(width, height)

    if (sizeOrError.isLeft()) {
      return left(sizeOrError.value)
    }
  }
}
