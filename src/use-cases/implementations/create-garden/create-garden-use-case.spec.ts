import { createGardenDTO } from '../../../domain/garden/garden';
import { ICreateGardenRepository } from '../../../repositories/create-garden';
import { CreateGardenUseCase } from './create-garden-use-case';

describe('CreateGarden UseCase', () => {
  test('should call CreateGardenRespository with correct params', async () => {
    class CreateGardenRepositoryStub implements ICreateGardenRepository {
      async create(gardenData: createGardenDTO): Promise<void> {
        return new Promise(resolve => resolve());
      }
    }

    const createGardenRepositoryStub = new CreateGardenRepositoryStub();
    const sut = new CreateGardenUseCase(createGardenRepositoryStub);
    const createSpy = jest.spyOn(createGardenRepositoryStub, 'create');
    const makeFakeCreateGardenDTO = {
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
    };

    await sut.execute(makeFakeCreateGardenDTO);

    expect(createSpy).toHaveBeenCalledWith(makeFakeCreateGardenDTO);
  });
});
