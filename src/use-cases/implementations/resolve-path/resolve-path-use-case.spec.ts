import { Garden } from '../../../domain/garden/garden';
import { Robot } from '../../../domain/robot/robot';
import { ResolvePathUseCase } from './resolve-path-use-case';

describe('ResolvePath UseCase', () => {
  test('should move robot to right if robot heading is N and irrigatePatch.x is grater than robot x position', async () => {
    const garden = Garden.create({
      size: { width: 4, height: 4 },
      irrigablePatches: [{ x: 1, y: 3 }],
    }).value as Garden;

    const robot = Robot.create({ garden, initialPosition: { x: 0, y: 1 } })
      .value as Robot;

    const sut = new ResolvePathUseCase(robot);
    const response = await sut.execute();

    expect(response.movements).toEqual(robot.movements);
    expect(response.finalHeading).toEqual(robot.heading);
    expect(response.movements.slice(0, 1)).toEqual(['D']);
  });

  test('should move robot to left if robot heading is S and irrigatePatch.x is grater than robot x position', async () => {
    const garden = Garden.create({
      size: { width: 4, height: 4 },
      irrigablePatches: [{ x: 1, y: 3 }],
    }).value as Garden;

    const robot = Robot.create({
      garden,
      initialPosition: { x: 0, y: 1 },
      initialHeading: 'S',
    }).value as Robot;

    const sut = new ResolvePathUseCase(robot);
    const response = await sut.execute();

    expect(response.movements).toEqual(robot.movements);
    expect(response.finalHeading).toEqual(robot.heading);
    expect(response.movements.slice(0, 1)).toEqual(['E']);
  });

  test('should invert robot if robot heading is west and irrigatePatch.x is grater than robot x position', async () => {
    const garden = Garden.create({
      size: { width: 4, height: 4 },
      irrigablePatches: [{ x: 1, y: 3 }],
    }).value as Garden;

    const robot = Robot.create({
      garden,
      initialPosition: { x: 0, y: 1 },
      initialHeading: 'O',
    }).value as Robot;

    const sut = new ResolvePathUseCase(robot);
    const response = await sut.execute();

    expect(response.movements).toEqual(robot.movements);
    expect(response.finalHeading).toEqual(robot.heading);
    expect(response.movements.slice(0, 2)).toEqual(['E', 'E']);
  });

  test('should move robot to right if robot heading is N and irrigatePatch.x is smaller than robot x position', async () => {
    const garden = Garden.create({
      size: { width: 4, height: 4 },
      irrigablePatches: [{ x: 1, y: 3 }],
    }).value as Garden;

    const robot = Robot.create({ garden, initialPosition: { x: 3, y: 1 } })
      .value as Robot;

    const sut = new ResolvePathUseCase(robot);
    const response = await sut.execute();

    expect(response.movements).toEqual(robot.movements);
    expect(response.finalHeading).toEqual(robot.heading);
    expect(response.movements.slice(0, 1)).toEqual(['E']);
  });

  test('should move robot to left if robot heading is S and irrigatePatch.x is smaller than robot x position', async () => {
    const garden = Garden.create({
      size: { width: 4, height: 4 },
      irrigablePatches: [{ x: 1, y: 3 }],
    }).value as Garden;

    const robot = Robot.create({
      garden,
      initialPosition: { x: 3, y: 1 },
      initialHeading: 'S',
    }).value as Robot;

    const sut = new ResolvePathUseCase(robot);
    const response = await sut.execute();

    expect(response.movements).toEqual(robot.movements);
    expect(response.finalHeading).toEqual(robot.heading);
    expect(response.movements.slice(0, 1)).toEqual(['D']);
  });

  test('should invert robot if robot heading is east and irrigatePatch.x is smaller than robot x position', async () => {
    const garden = Garden.create({
      size: { width: 4, height: 4 },
      irrigablePatches: [{ x: 1, y: 3 }],
    }).value as Garden;

    const robot = Robot.create({
      garden,
      initialPosition: { x: 3, y: 1 },
      initialHeading: 'L',
    }).value as Robot;

    const sut = new ResolvePathUseCase(robot);
    const response = await sut.execute();

    expect(response.movements).toEqual(robot.movements);
    expect(response.finalHeading).toEqual(robot.heading);
    expect(response.movements.slice(0, 2)).toEqual(['E', 'E']);
  });

  test('should move robot to irrigablePatch when irrigatePatch.x is greater than robot x position', async () => {
    const garden = Garden.create({
      size: { width: 4, height: 4 },
      irrigablePatches: [{ x: 3, y: 3 }],
    }).value as Garden;

    const robot = Robot.create({
      garden,
      initialPosition: { x: 1, y: 1 },
      initialHeading: 'L',
    }).value as Robot;

    const sut = new ResolvePathUseCase(robot);
    const response = await sut.execute();

    expect(response.movements).toEqual(robot.movements);
    expect(response.finalHeading).toEqual(robot.heading);
    expect(response.movements.slice(0, 2)).toEqual(['M', 'M']);
  });

  test('should move robot to irrigablePatch when irrigatePatch.x is smaller than robot x position', async () => {
    const garden = Garden.create({
      size: { width: 4, height: 4 },
      irrigablePatches: [{ x: 1, y: 3 }],
    }).value as Garden;

    const robot = Robot.create({
      garden,
      initialPosition: { x: 3, y: 1 },
      initialHeading: 'O',
    }).value as Robot;

    const sut = new ResolvePathUseCase(robot);
    const response = await sut.execute();

    expect(response.movements).toEqual(robot.movements);
    expect(response.finalHeading).toEqual(robot.heading);
    expect(response.movements.slice(0, 2)).toEqual(['M', 'M']);
  });

  test('should irrigate patch', async () => {
    const garden = Garden.create({
      size: { width: 4, height: 4 },
      irrigablePatches: [{ x: 1, y: 2 }],
    }).value as Garden;

    const robot = Robot.create({
      garden,
      initialPosition: { x: 3, y: 1 },
    }).value as Robot;

    const sut = new ResolvePathUseCase(robot);
    const response = await sut.execute();

    expect(response.movements).toEqual(robot.movements);
    expect(response.finalHeading).toEqual(robot.heading);
    expect(response.movements).toEqual(['E', 'M', 'M', 'D', 'M', 'I']);
  });
});
