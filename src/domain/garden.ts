import { Either, left, right } from '../core/either'
import { InvalidCoordinateError } from './errors/invalid-coordinate-error'
import { InvalidSizeError } from './errors/invalid-size-error'
import { Patch } from './patch'
import { Size, sizeType } from './size'

export class Garden {
  private _size: Size
  private _patches: Patch[]

  private constructor (size: Size, patches: Patch[]) {
    this._size = size
    this._patches = patches
    Object.freeze(this)
  }

  get size (): Size {
    return this._size
  }

  get patches (): Patch[] {
    return this._patches
  }

  static create ({ width, height }: sizeType): Either<InvalidSizeError | InvalidCoordinateError, Garden> {
    const sizeOrError = Size.create(width, height)

    if (sizeOrError.isLeft()) {
      return left(sizeOrError.value)
    }

    const patches: Patch[] = []
    for (let i = 0; i < width; i++) {
      for (let j = 0; j < height; j++) {
        const patchOrError = Patch.create({ x: i, y: j, isIrrigable: false })

        if (patchOrError.isLeft()) {
          return left(patchOrError.value)
        }

        patches.push(patchOrError.value)
      }
    }

    return right(new Garden(sizeOrError.value, patches))
  }
}
