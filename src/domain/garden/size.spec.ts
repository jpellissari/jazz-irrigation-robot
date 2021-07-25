import { left } from '../../core/either';
import { InvalidSizeError } from './errors/invalid-size-error';
import { Size } from './size';

describe('Size ValueObject', () => {
  test('should not be able to create size with invalid width (negative number)', () => {
    const invalidWidth = -1;
    const sizeOrError = Size.create(invalidWidth, 1);

    expect(sizeOrError).toEqual(left(new InvalidSizeError()));
  });

  test('should not be able to create size with width equal to 0', () => {
    const invalidWidth = 0;
    const sizeOrError = Size.create(invalidWidth, 1);

    expect(sizeOrError).toEqual(left(new InvalidSizeError()));
  });

  test('should not be able to create size with invalid height (negative number)', () => {
    const invalidHeight = -1;
    const sizeOrError = Size.create(1, invalidHeight);

    expect(sizeOrError).toEqual(left(new InvalidSizeError()));
  });

  test('should not be able to create size with height equal to 0', () => {
    const invalidHeight = 0;
    const sizeOrError = Size.create(1, invalidHeight);

    expect(sizeOrError).toEqual(left(new InvalidSizeError()));
  });

  test('should be able to create size on success', () => {
    const sizeOrError = Size.create(1, 1);

    expect(sizeOrError.isRight()).toBeTruthy();
  });
});
