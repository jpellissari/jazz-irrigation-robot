import { Either, left, right } from '../core/either'
import { InvalidCoordinateError } from './errors/invalid-coordinate-error'

export type coordinateType = {
  x: number
  y: number
}

export class Coordinate {
  private readonly x: number
  private readonly y: number

  private constructor (x: number, y: number) {
    this.x = x
    this.y = y
    Object.freeze(this)
  }

  get value (): coordinateType {
    return { x: this.x, y: this.y }
  }

  static create (x: number, y: number): Either<InvalidCoordinateError, Coordinate> {
    if (x < 0 || y < 0) {
      return left(new InvalidCoordinateError())
    }

    return right(new Coordinate(x,y))
  }
}
