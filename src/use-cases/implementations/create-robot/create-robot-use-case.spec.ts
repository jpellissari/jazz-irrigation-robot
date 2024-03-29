import { createGardenDTO, Garden } from '../../../domain/garden/garden';
import { Robot } from '../../../domain/robot/robot';
import { IGetGardenRepository } from '../../../repositories/get-garden';
import { ISaveRobotRepository } from '../../../repositories/save-robot';
import { ICreateRobotUseCase } from '../../protocols/create-robot-use-case';
import { CreateRobotUseCase } from './create-robot-use-case';

const makeFakeSaveRobotRepository = (): ISaveRobotRepository => {
  class SaveRobotRepositoryStub implements ISaveRobotRepository {
    async save(garden: Robot): Promise<void> {
      return new Promise(resolve => resolve());
    }
  }

  return new SaveRobotRepositoryStub();
};

const makeFakeGetGardenRepository = (): IGetGardenRepository => {
  class GardenRepositoryStub implements IGetGardenRepository {
    async get(): Promise<Garden> {
      const garden = Garden.create({
        size: { width: 4, height: 4 },
        irrigablePatches: [{ x: 1, y: 1 }],
      }).value as Garden;

      return garden;
    }
  }
  return new GardenRepositoryStub();
};

const makeFakeCreateGardenDTO = (): createGardenDTO => ({
  size: {
    width: 4,
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
  saveRobotRepositoryStub: ISaveRobotRepository;
  sut: ICreateRobotUseCase;
};

const makeSut = (): SutTypes => {
  const saveRobotRepositoryStub = makeFakeSaveRobotRepository();
  const sut = new CreateRobotUseCase(
    makeFakeGetGardenRepository(),
    saveRobotRepositoryStub,
  );

  return {
    saveRobotRepositoryStub,
    sut,
  };
};

describe('CreateRobot UseCase', () => {
  test('should call SaveRobotRespository with correct params', async () => {
    const { sut, saveRobotRepositoryStub } = makeSut();
    const saveSpy = jest.spyOn(saveRobotRepositoryStub, 'save');

    await sut.execute({
      initialHeading: 's',
      initialPosition: { x: 1, y: 1 },
    });

    expect(saveSpy).toHaveBeenCalledWith(
      Robot.create({
        garden: await makeFakeGetGardenRepository().get(),
        initialHeading: 's',
        initialPosition: { x: 1, y: 1 },
      }).value,
    );
  });

  test('should call SaveRobotRespository with default values', async () => {
    const { sut, saveRobotRepositoryStub } = makeSut();
    const saveSpy = jest.spyOn(saveRobotRepositoryStub, 'save');

    const garden = Garden.create(makeFakeCreateGardenDTO()).value as Garden;
    await sut.execute({});

    expect(saveSpy).toHaveBeenCalledWith(
      Robot.create({
        garden,
        initialHeading: 'N',
        initialPosition: { x: 0, y: 0 },
      }).value,
    );
  });
});
