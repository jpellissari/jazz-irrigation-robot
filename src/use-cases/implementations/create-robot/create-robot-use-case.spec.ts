import { createGardenDTO, Garden } from '../../../domain/garden/garden';
import { Robot } from '../../../domain/robot/robot';
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
  saveRobotRepositoryStub: ISaveRobotRepository;
  sut: ICreateRobotUseCase;
};

const makeSut = (): SutTypes => {
  const saveRobotRepositoryStub = makeFakeSaveRobotRepository();
  const sut = new CreateRobotUseCase(saveRobotRepositoryStub);

  return {
    saveRobotRepositoryStub,
    sut,
  };
};

describe('CreateRobot UseCase', () => {
  test('should call SaveRobotRespository with correct params', async () => {
    const { sut, saveRobotRepositoryStub } = makeSut();
    const saveSpy = jest.spyOn(saveRobotRepositoryStub, 'save');

    const garden = Garden.create(makeFakeCreateGardenDTO()).value as Garden;
    await sut.execute(garden);

    expect(saveSpy).toHaveBeenCalledWith(Robot.create({ garden }).value);
  });
});
