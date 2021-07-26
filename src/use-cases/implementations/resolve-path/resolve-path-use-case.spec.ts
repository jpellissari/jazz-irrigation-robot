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

    const sut = new ResolvePathUseCase();
    const response = await sut.execute(robot);

    expect(response.movements).toEqual(robot.movements);
    expect(response.finalHeading).toEqual(robot.heading);
    expect(response.movements).toEqual(['D']);
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

    const sut = new ResolvePathUseCase();
    const response = await sut.execute(robot);

    expect(response.movements).toEqual(robot.movements);
    expect(response.finalHeading).toEqual(robot.heading);
    expect(response.movements).toEqual(['E']);
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

    const sut = new ResolvePathUseCase();
    const response = await sut.execute(robot);

    expect(response.movements).toEqual(robot.movements);
    expect(response.finalHeading).toEqual(robot.heading);
    expect(response.movements).toEqual(['E', 'E']);
  });
});
