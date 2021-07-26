import { Either, left, right } from '../../../core/either';
import { InvalidSizeError } from '../../../domain/garden/errors/invalid-size-error';
import { MissingIrrigablePatchError } from '../../../domain/garden/errors/missing-irrigable-patch-error';
import { createGardenDTO, Garden } from '../../../domain/garden/garden';
import { InvalidCoordinateError } from '../../../domain/shared/errors/invalid-coordinate-error';
import { ISaveGardenRepository } from '../../../repositories/save-garden';
import { ICreateGardenUseCase } from '../../protocols/create-garden-use-case';

export class CreateGardenUseCase implements ICreateGardenUseCase {
  constructor(private readonly saveGardenRepository: ISaveGardenRepository) {}

  async execute({
    size,
    irrigablePatches,
  }: createGardenDTO): Promise<
    Either<
      InvalidSizeError | InvalidCoordinateError | MissingIrrigablePatchError,
      Garden
    >
  > {
    const gardenOrError = Garden.create({ size, irrigablePatches });

    if (gardenOrError.isLeft()) {
      return left(gardenOrError.value);
    }

    const garden = gardenOrError.value;

    await this.saveGardenRepository.save(garden);

    return right();
  }
}
