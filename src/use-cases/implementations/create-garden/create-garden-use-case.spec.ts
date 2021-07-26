import { InvalidSizeError } from '../../../domain/garden/errors/invalid-size-error';
import { MissingIrrigablePatchError } from '../../../domain/garden/errors/missing-irrigable-patch-error';
import { createGardenDTO, Garden } from '../../../domain/garden/garden';
import { ISaveGardenRepository } from '../../../repositories/save-garden';
import { ICreateGardenUseCase } from '../../protocols/create-garden-use-case';
import { CreateGardenUseCase } from './create-garden-use-case';

const makeFakeSaveGardenRepository = (): ISaveGardenRepository => {
  class SaveGardenRepositoryStub implements ISaveGardenRepository {
    async save(garden: Garden): Promise<void> {
      return new Promise(resolve => resolve());
    }
  }

  return new SaveGardenRepositoryStub();
};

const makeFakeCreateGardenDTO = (): createGardenDTO => ({
  size: {
    width: 3,
    height: 4,
  },
  irrigablePatches: [
    {
      x: 1,
      y: 1,
    },
  ],
});

type SutTypes = {
  saveGardenRepositoryStub: ISaveGardenRepository;
  sut: ICreateGardenUseCase;
};

const makeSut = (): SutTypes => {
  const saveGardenRepositoryStub = makeFakeSaveGardenRepository();
  const sut = new CreateGardenUseCase(saveGardenRepositoryStub);

  return {
    saveGardenRepositoryStub,
    sut,
  };
};

describe('CreateGarden UseCase', () => {
  test('should call SaveGardenRespository with correct params', async () => {
    const { sut, saveGardenRepositoryStub } = makeSut();
    const saveSpy = jest.spyOn(saveGardenRepositoryStub, 'save');

    await sut.execute(makeFakeCreateGardenDTO());

    expect(saveSpy).toHaveBeenCalledWith(
      Garden.create(makeFakeCreateGardenDTO()).value,
    );
  });

  test('should return left if incorrect size params is supplied', async () => {
    const { sut } = makeSut();

    const error = await sut.execute({
      ...makeFakeCreateGardenDTO(),
      size: { width: 0, height: 1 },
    });

    expect(error.isLeft()).toBeTruthy();
    expect(error.value).toEqual(new InvalidSizeError());
  });

  test('should return left if irrigable patches is empty', async () => {
    const { sut } = makeSut();

    const error = await sut.execute({
      ...makeFakeCreateGardenDTO(),
      irrigablePatches: [],
    });

    expect(error.isLeft()).toBeTruthy();
    expect(error.value).toEqual(new MissingIrrigablePatchError());
  });
});
