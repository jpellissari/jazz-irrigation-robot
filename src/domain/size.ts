import { Either, left, right } from '../core/either'
import { InvalidSizeError } from './errors/invalid-size-error'

export type sizeType = {
  width: number
  height: number
}

export class Size {
  private width: number
  private height: number

  private constructor (width: number, height: number) {
    this.width = width
    this.height = height
    Object.freeze(this)
  }

  get value (): sizeType {
    return { width: this.width, height: this.height }
  }

  static create (width: number, height: number): Either<InvalidSizeError, Size> {
    if (width <= 0 || height <= 0) {
      return left(new InvalidSizeError())
    }

    return right(new Size(width, height))
  }
}
