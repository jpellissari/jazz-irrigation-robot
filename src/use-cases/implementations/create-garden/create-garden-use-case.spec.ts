import { createGardenDTO } from '../../../domain/garden/garden';
import { ICreateGardenRepository } from '../../../repositories/create-garden';
import { ICreateGardenUseCase } from '../../protocols/create-garden-use-case';
import { CreateGardenUseCase } from './create-garden-use-case';

const makeFakeCreateGardenRepository = (): ICreateGardenRepository => {
  class CreateGardenRepositoryStub implements ICreateGardenRepository {
    async create(gardenData: createGardenDTO): Promise<void> {
      return new Promise(resolve => resolve());
    }
  }

  return new CreateGardenRepositoryStub();
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
  createGardenRepositoryStub: ICreateGardenRepository;
  sut: ICreateGardenUseCase;
};

const makeSut = (): SutTypes => {
  const createGardenRepositoryStub = makeFakeCreateGardenRepository();
  const sut = new CreateGardenUseCase(createGardenRepositoryStub);

  return {
    createGardenRepositoryStub,
    sut,
  };
};
describe('CreateGarden UseCase', () => {
  test('should call CreateGardenRespository with correct params', async () => {
    const { sut, createGardenRepositoryStub } = makeSut();
    const createSpy = jest.spyOn(createGardenRepositoryStub, 'create');

    await sut.execute(makeFakeCreateGardenDTO());

    expect(createSpy).toHaveBeenCalledWith(makeFakeCreateGardenDTO());
  });
});
