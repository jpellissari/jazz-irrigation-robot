import { Either, right } from '../../../core/either';
import { InvalidSizeError } from '../../../domain/garden/errors/invalid-size-error';
import { MissingIrrigablePatchError } from '../../../domain/garden/errors/missing-irrigable-patch-error';
import { createGardenDTO, Garden } from '../../../domain/garden/garden';
import { InvalidCoordinateError } from '../../../domain/shared/errors/invalid-coordinate-error';
import { ICreateGardenRepository } from '../../../repositories/create-garden';
import { ICreateGardenUseCase } from '../../protocols/create-garden-use-case';

export class CreateGardenUseCase implements ICreateGardenUseCase {
  constructor(
    private readonly createGardenRepository: ICreateGardenRepository,
  ) {}

  async execute({
    size,
    irrigablePatches,
  }: createGardenDTO): Promise<
    Either<
      InvalidSizeError | InvalidCoordinateError | MissingIrrigablePatchError,
      Garden
    >
  > {
    await this.createGardenRepository.create({ size, irrigablePatches });

    return right();
  }
}
