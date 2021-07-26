import { Either } from '../../core/either';
import { InvalidSizeError } from '../../domain/garden/errors/invalid-size-error';
import { MissingIrrigablePatchError } from '../../domain/garden/errors/missing-irrigable-patch-error';
import { createGardenDTO, Garden } from '../../domain/garden/garden';
import { InvalidCoordinateError } from '../../domain/shared/errors/invalid-coordinate-error';

export interface ICreateGardenUseCase {
  execute({
    size,
    irrigablePatches,
  }: createGardenDTO): Promise<
    Either<
      InvalidSizeError | InvalidCoordinateError | MissingIrrigablePatchError,
      Garden
    >
  >;
}
