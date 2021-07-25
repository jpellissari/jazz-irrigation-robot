import { Either, left, right } from '../core/either'
import { InvalidCoordinateError } from './errors/invalid-coordinate-error'

export class Coordinate {
  private readonly coordinate: number

  private constructor (coordinate: number) {
    this.coordinate = coordinate
    Object.freeze(this)
  }

  get value (): number {
    return this.coordinate
  }

  static create (coordinate: number): Either<InvalidCoordinateError, Coordinate> {
    if (coordinate < 0) {
      return left(new InvalidCoordinateError())
    }

    return right(new Coordinate(coordinate))
  }
}
