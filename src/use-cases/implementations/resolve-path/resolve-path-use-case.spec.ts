import { Garden } from '../../../domain/garden/garden';
import { Robot } from '../../../domain/robot/robot';
import { IGetGardenRepository } from '../../../repositories/get-garden';
import { IGetRobotRepository } from '../../../repositories/get-robot';
import { ResolvePathUseCase } from './resolve-path-use-case';

const makeFakeGetGardenRepository = ({
  size,
  irrigablePatches,
}: any): IGetGardenRepository => {
  class GardenRepositoryStub implements IGetGardenRepository {
    async get(): Promise<Garden> {
      const garden = Garden.create({
        size,
        irrigablePatches,
      }).value as Garden;

      return garden;
    }
  }
  return new GardenRepositoryStub();
};

const makeFakeGetRobotRepository = ({
  size = { width: 4, height: 4 },
  initialPosition = { x: 0, y: 1 },
  initialHeading = 'N',
  irrigablePatches,
}: any): IGetRobotRepository => {
  class RobotRepositoryStub implements IGetRobotRepository {
    async get(): Promise<Robot> {
      const gardenRespository = makeFakeGetGardenRepository({
        size,
        irrigablePatches,
      });
      const garden = await gardenRespository.get();
      const robot = Robot.create({ garden, initialHeading, initialPosition })
        .value as Robot;

      return robot;
    }
  }
  return new RobotRepositoryStub();
};

describe('ResolvePath UseCase', () => {
  test('should move robot to right if robot heading is N and irrigatePatch.x is grater than robot x position', async () => {
    const sut = new ResolvePathUseCase(
      makeFakeGetRobotRepository({ irrigablePatches: [{ x: 1, y: 3 }] }),
    );
    const response = await sut.execute();

    expect(response.movements.slice(0, 1)).toEqual(['D']);
  });

  test('should move robot to left if robot heading is S and irrigatePatch.x is grater than robot x position', async () => {
    const sut = new ResolvePathUseCase(
      makeFakeGetRobotRepository({
        irrigablePatches: [{ x: 1, y: 3 }],
        initialPosition: { x: 0, y: 1 },
        initialHeading: 'S',
      }),
    );
    const response = await sut.execute();

    expect(response.movements.slice(0, 1)).toEqual(['E']);
  });

  test('should invert robot if robot heading is west and irrigatePatch.x is grater than robot x position', async () => {
    const sut = new ResolvePathUseCase(
      makeFakeGetRobotRepository({
        irrigablePatches: [{ x: 1, y: 3 }],
        initialPosition: { x: 0, y: 1 },
        initialHeading: 'O',
      }),
    );

    const response = await sut.execute();

    expect(response.movements.slice(0, 2)).toEqual(['E', 'E']);
  });

  test('should move robot to right if robot heading is N and irrigatePatch.x is smaller than robot x position', async () => {
    const sut = new ResolvePathUseCase(
      makeFakeGetRobotRepository({
        irrigablePatches: [{ x: 1, y: 3 }],
        initialPosition: { x: 3, y: 1 },
      }),
    );
    const response = await sut.execute();

    expect(response.movements.slice(0, 1)).toEqual(['E']);
  });

  test('should move robot to left if robot heading is S and irrigatePatch.x is smaller than robot x position', async () => {
    const sut = new ResolvePathUseCase(
      makeFakeGetRobotRepository({
        irrigablePatches: [{ x: 1, y: 3 }],
        initialPosition: { x: 3, y: 1 },
        initialHeading: 'S',
      }),
    );
    const response = await sut.execute();

    expect(response.movements.slice(0, 1)).toEqual(['D']);
  });

  test('should invert robot if robot heading is east and irrigatePatch.x is smaller than robot x position', async () => {
    const sut = new ResolvePathUseCase(
      makeFakeGetRobotRepository({
        irrigablePatches: [{ x: 1, y: 3 }],
        initialPosition: { x: 3, y: 1 },
        initialHeading: 'L',
      }),
    );
    const response = await sut.execute();

    expect(response.movements.slice(0, 2)).toEqual(['E', 'E']);
  });

  test('should move robot to irrigablePatch when irrigatePatch.x is greater than robot x position', async () => {
    const sut = new ResolvePathUseCase(
      makeFakeGetRobotRepository({
        irrigablePatches: [{ x: 3, y: 3 }],
        initialPosition: { x: 1, y: 1 },
        initialHeading: 'L',
      }),
    );
    const response = await sut.execute();

    expect(response.movements.slice(0, 2)).toEqual(['M', 'M']);
  });

  test('should move robot to irrigablePatch when irrigatePatch.x is smaller than robot x position', async () => {
    const sut = new ResolvePathUseCase(
      makeFakeGetRobotRepository({
        irrigablePatches: [{ x: 1, y: 3 }],
        initialPosition: { x: 3, y: 1 },
        initialHeading: 'O',
      }),
    );
    const response = await sut.execute();

    expect(response.movements.slice(0, 2)).toEqual(['M', 'M']);
  });

  test('should move robot to irrigablePatch when irrigatePatch.y is greater than robot y position and robot is already at the right x coordinate', async () => {
    const sut = new ResolvePathUseCase(
      makeFakeGetRobotRepository({
        irrigablePatches: [{ x: 1, y: 2 }],
        initialPosition: { x: 1, y: 1 },
        initialHeading: 'N',
      }),
    );
    const response = await sut.execute();

    expect(response.movements.slice(0, 1)).toEqual(['M']);
  });

  test('should move robot to irrigablePatch when irrigatePatch.y is smaller than robot y position and robot is already at the right x coordinate', async () => {
    const sut = new ResolvePathUseCase(
      makeFakeGetRobotRepository({
        irrigablePatches: [{ x: 2, y: 1 }],
        initialPosition: { x: 2, y: 2 },
        initialHeading: 'S',
      }),
    );
    const response = await sut.execute();

    expect(response.movements.slice(0, 1)).toEqual(['M']);
  });

  test('should irrigate patch', async () => {
    const sut = new ResolvePathUseCase(
      makeFakeGetRobotRepository({
        irrigablePatches: [{ x: 1, y: 2 }],
        initialPosition: { x: 3, y: 1 },
      }),
    );
    const response = await sut.execute();

    expect(response.movements).toEqual(['E', 'M', 'M', 'D', 'M', 'I']);
  });
});
