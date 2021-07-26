import { Either, left, right } from '../../core/either';
import { coordinateType } from '../shared/coordinate';
import { InvalidCoordinateError } from '../shared/errors/invalid-coordinate-error';
import { InvalidSizeError } from './errors/invalid-size-error';
import { MissingIrrigablePatchError } from './errors/missing-irrigable-patch-error';
import { Patch } from './patch';
import { Size, sizeType } from './size';

export type createGardenDTO = {
  size: sizeType;
  irrigablePatches: coordinateType[];
};

export class Garden {
  private _size: Size;
  private _patches: Patch[];
  private _irrigatedPatches: Patch[];

  private constructor(size: Size, patches: Patch[]) {
    this._size = size;
    this._patches = patches;
    this._irrigatedPatches = [];
  }

  get size(): Size {
    return this._size;
  }

  get patches(): Patch[] {
    return this._patches;
  }

  get irrigablePatchesCoordinates(): coordinateType[] {
    return this._patches
      .filter(patch => patch.isIrrigable)
      .map(patch => patch.coordinate.value);
  }

  get irrigatedPatches(): Patch[] {
    return this._irrigatedPatches;
  }

  addIrrigatedPatch(patch: Patch): void {
    this._irrigatedPatches.push(patch);
  }

  static create({
    size: { width, height },
    irrigablePatches,
  }: createGardenDTO): Either<
    InvalidSizeError | InvalidCoordinateError | MissingIrrigablePatchError,
    Garden
  > {
    const sizeOrError = Size.create(width, height);

    if (sizeOrError.isLeft()) {
      return left(sizeOrError.value);
    }

    const patches: Patch[] = [];
    for (let i = 0; i < width; i++) {
      for (let j = 0; j < height; j++) {
        const isIrrigable = irrigablePatches.some(
          irrigablePatch => irrigablePatch.x === i && irrigablePatch.y === j,
        );

        const patchOrError = Patch.create({ x: i, y: j, isIrrigable });

        if (patchOrError.isLeft()) {
          return left(patchOrError.value);
        }

        patches.push(patchOrError.value);
      }
    }

    if (!patches.some(patch => patch.isIrrigable)) {
      return left(new MissingIrrigablePatchError());
    }

    return right(new Garden(sizeOrError.value, patches));
  }
}
