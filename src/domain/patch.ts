import { Either, left, right } from '../core/either'
import { Coordinate } from './coordinate'
import { InvalidCoordinateError } from './errors/invalid-coordinate-error'

type createPatchDTO = {
  x: number
  y: number
  isIrrigable: boolean
}

export class Patch {
  private coordinate: Coordinate
  private isIrrigable: boolean

  private constructor (coordinate: Coordinate, isIrrigable: boolean) {
    this.coordinate = coordinate
    this.isIrrigable = isIrrigable
  }

  static create ({ x, y, isIrrigable }: createPatchDTO): Either<InvalidCoordinateError, Patch> {
    const coordinateOrError = Coordinate.create(x, y)

    if (coordinateOrError.isLeft()) {
      return left(coordinateOrError.value)
    }

    const coordinate = coordinateOrError.value
    return right(new Patch(coordinate, isIrrigable))
  }
}
