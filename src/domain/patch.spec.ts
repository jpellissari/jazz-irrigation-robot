import { left } from '../core/either'
import { InvalidCoordinateError } from './errors/invalid-coordinate-error'
import { Patch } from './patch'

describe('Patch Entiy', () => {
  test('should not create Patch with invalid x coordinate (negative number)', () => {
    const invalidX = -1
    const patchOrError = Patch.create({ x: invalidX, y: 1, isIrrigable: true })

    expect(patchOrError).toEqual(left(new InvalidCoordinateError()))
  })

  test('should not create Patch with invalid y coordinate (negative number)', () => {
    const invalidY = -1
    const patchOrError = Patch.create({ x: 1, y: invalidY, isIrrigable: true })

    expect(patchOrError).toEqual(left(new InvalidCoordinateError()))
  })

  test('should create Patch on success', () => {
    const patchOrError = Patch.create({ x: 1, y: 1, isIrrigable: true })

    expect(patchOrError.isRight()).toBeTruthy()
  })
})
