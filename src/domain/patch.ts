import { Either, left, right } from '../core/either'
import { Coordinate } from './coordinate'
import { InvalidCoordinateError } from './errors/invalid-coordinate-error'

type createPatchDTO = {
  x: number
  y: number
  isIrrigable: boolean
}

export class Patch {
  private _coordinate: Coordinate
  private _isIrrigable: boolean

  private constructor (coordinate: Coordinate, isIrrigable: boolean) {
    this._coordinate = coordinate
    this._isIrrigable = isIrrigable
  }

  get coordinate (): Coordinate {
    return this._coordinate
  }

  get isIrrigable (): boolean {
    return this._isIrrigable
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
