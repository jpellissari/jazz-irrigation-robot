import { Garden } from '../garden/garden';
import { Robot } from './robot';

describe('Robot Entity', () => {
  test('should create a robot on success', () => {
    const garden = Garden.create({
      size: { width: 2, height: 2 },
      irrigablePatches: [{ x: 0, y: 0 }],
    }).value as Garden;

    const robotOrError = Robot.create(garden);

    expect(robotOrError.isRight()).toBeTruthy();
  });

  test("should return robot's garden size on success", () => {
    const garden = Garden.create({
      size: { width: 2, height: 2 },
      irrigablePatches: [{ x: 0, y: 0 }],
    }).value as Garden;

    const robotOrError = Robot.create(garden);
    const robot = robotOrError.isRight() ? robotOrError.value : null;

    expect(robot.gardenSize).toEqual({ width: 2, height: 2 });
  });

  test("should return robot's position on success", () => {
    const garden = Garden.create({
      size: { width: 2, height: 2 },
      irrigablePatches: [{ x: 0, y: 0 }],
    }).value as Garden;

    const robotOrError = Robot.create(garden);
    const robot = robotOrError.isRight() ? robotOrError.value : null;

    expect(robot.position).toEqual({ x: 0, y: 0 });
  });

  test("should return robot's heading on success", () => {
    const garden = Garden.create({
      size: { width: 2, height: 2 },
      irrigablePatches: [{ x: 0, y: 0 }],
    }).value as Garden;

    const robotOrError = Robot.create(garden);
    const robot = robotOrError.isRight() ? robotOrError.value : null;

    expect(robot.heading).toEqual('N');
  });
});
