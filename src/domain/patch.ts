import { Either, left, right } from '../core/either'
import { Coordinate } from './coordinate'
import { InvalidCoordinateError } from './errors/invalid-coordinate-error'

type createPatchDTO = {
  x: number
  y: number
  isIrrigable: boolean
}

export class Patch {
  private x: Coordinate
  private y: Coordinate
  private isIrrigable: boolean

  private constructor (x: Coordinate, y: Coordinate, isIrrigable: boolean) {
    this.x = x
    this.y = y
    this.isIrrigable = isIrrigable
  }

  static create ({ x, y, isIrrigable }: createPatchDTO): Either<InvalidCoordinateError, Patch> {
    const xCoordinateOrError = Coordinate.create(x)
    const yCoordinateOrError = Coordinate.create(y)

    if (xCoordinateOrError.isLeft()) {
      return left(xCoordinateOrError.value)
    }
    if (yCoordinateOrError.isLeft()) {
      return left(yCoordinateOrError.value)
    }

    const xCoordinate = xCoordinateOrError.value
    const yCoordinate = xCoordinateOrError.value

    return right(new Patch(xCoordinate, yCoordinate, isIrrigable))
  }
}
