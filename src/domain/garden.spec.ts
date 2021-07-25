import { left } from '../core/either'
import { InvalidSizeError } from './errors/invalid-size-error'
import { Garden } from './garden'
import { sizeType } from './size'

describe('Garden Entiy', () => {
  test('should not create Garden with invalid width size', () => {
    const size: sizeType = {
      width: 0,
      height: 1
    }
    const gardenOrError = Garden.create(size)

    expect(gardenOrError).toEqual(left(new InvalidSizeError()))
  })

  test('should not create Garden with invalid height size', () => {
    const size: sizeType = {
      width: 1,
      height: 0
    }
    const gardenOrError = Garden.create(size)

    expect(gardenOrError).toEqual(left(new InvalidSizeError()))
  })

  test('should create Garden with patches', () => {
    const size: sizeType = {
      width: 4,
      height: 4
    }
    const gardenOrError = Garden.create(size)
    const garden = gardenOrError.isRight() ? gardenOrError.value : null

    expect(gardenOrError.isRight()).toBeTruthy()
    expect(garden.size).toEqual(size)
    expect(garden.patches.length).toEqual(size.width * size.height)
  })
})
