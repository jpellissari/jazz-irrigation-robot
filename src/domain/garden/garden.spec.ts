import { left } from '../../core/either';
import { InvalidSizeError } from './errors/invalid-size-error';
import { MissingIrrigablePatchError } from './errors/missing-irrigable-patch-error';
import { createGardenDTO, Garden } from './garden';

const makeFakeCreateGardenDTO = (width = 2, height = 2): createGardenDTO => ({
  size: {
    width,
    height,
  },
  irrigablePatches: [{ x: 0, y: 0 }],
});

describe('Garden Entiy', () => {
  test('should not create Garden with invalid width size', () => {
    const gardenOrError = Garden.create(makeFakeCreateGardenDTO(0, 1));

    expect(gardenOrError).toEqual(left(new InvalidSizeError()));
  });

  test('should not create Garden with invalid height size', () => {
    const gardenOrError = Garden.create(makeFakeCreateGardenDTO(1, 0));

    expect(gardenOrError).toEqual(left(new InvalidSizeError()));
  });

  test('should not create Garden without at least one irrigable patch', () => {
    const gardenOrError = Garden.create({
      ...makeFakeCreateGardenDTO(),
      irrigablePatches: [{ x: 10, y: 10 }],
    });

    expect(gardenOrError.isLeft()).toBeTruthy();
    expect(gardenOrError.value).toEqual(new MissingIrrigablePatchError());
  });

  test('should create Garden with patches', () => {
    const gardenOrError = Garden.create(makeFakeCreateGardenDTO());
    const garden = gardenOrError.isRight() ? gardenOrError.value : null;

    expect(gardenOrError.isRight()).toBeTruthy();
    expect(garden.size).toEqual(makeFakeCreateGardenDTO().size);
    expect(garden.patches.length).toEqual(
      makeFakeCreateGardenDTO().size.width *
        makeFakeCreateGardenDTO().size.height,
    );
  });
});
