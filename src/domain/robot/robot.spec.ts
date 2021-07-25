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

  test('should not move robot one position to north if out of bounds', () => {
    const garden = Garden.create({
      size: { width: 2, height: 2 },
      irrigablePatches: [{ x: 0, y: 0 }],
    }).value as Garden;

    const robotOrError = Robot.create(garden);
    const robot = robotOrError.isRight() ? robotOrError.value : null;

    robot.move();
    const moveOrError = robot.move();

    expect(robot.heading).toEqual('N');
    expect(moveOrError.isLeft()).toBeTruthy();
    expect(robot.movements).toEqual(['N']);
  });

  test('should change robot heading on success', () => {
    const garden = Garden.create({
      size: { width: 2, height: 2 },
      irrigablePatches: [{ x: 0, y: 0 }],
    }).value as Garden;

    const robotOrError = Robot.create(garden);
    const robot = robotOrError.isRight() ? robotOrError.value : null;

    const changeHeadingOrError = robot.changeHeading('S');

    expect(robot.heading).toEqual('S');
    expect(changeHeadingOrError.isRight()).toBeTruthy();
  });

  test('should not change robot heading if heading is invalid', () => {
    const garden = Garden.create({
      size: { width: 2, height: 2 },
      irrigablePatches: [{ x: 0, y: 0 }],
    }).value as Garden;

    const robotOrError = Robot.create(garden);
    const robot = robotOrError.isRight() ? robotOrError.value : null;

    const changeHeadingOrError = robot.changeHeading('invalid_heading');

    expect(robot.heading).toEqual('N');
    expect(changeHeadingOrError.isLeft()).toBeTruthy();
  });

  test('should not move robot one position to south if out of bounds', () => {
    const garden = Garden.create({
      size: { width: 2, height: 2 },
      irrigablePatches: [{ x: 0, y: 0 }],
    }).value as Garden;

    const robotOrError = Robot.create(garden);
    const robot = robotOrError.isRight() ? robotOrError.value : null;

    robot.changeHeading('S');

    const moveOrError = robot.move();

    expect(robot.heading).toEqual('S');
    expect(moveOrError.isLeft()).toBeTruthy();
  });

  test('should not move robot one position to west if out of bounds', () => {
    const garden = Garden.create({
      size: { width: 2, height: 2 },
      irrigablePatches: [{ x: 0, y: 0 }],
    }).value as Garden;

    const robotOrError = Robot.create(garden);
    const robot = robotOrError.isRight() ? robotOrError.value : null;

    robot.changeHeading('O');

    const moveOrError = robot.move();

    expect(robot.heading).toEqual('O');
    expect(moveOrError.isLeft()).toBeTruthy();
  });

  test('should not move robot one position to east if out of bounds', () => {
    const garden = Garden.create({
      size: { width: 2, height: 2 },
      irrigablePatches: [{ x: 0, y: 0 }],
    }).value as Garden;

    const robotOrError = Robot.create(garden);
    const robot = robotOrError.isRight() ? robotOrError.value : null;

    robot.changeHeading('L');

    robot.move();
    const moveOrError = robot.move();

    expect(robot.heading).toEqual('L');
    expect(moveOrError.isLeft()).toBeTruthy();
  });

  test('should move robot one position to north on success', () => {
    const garden = Garden.create({
      size: { width: 2, height: 2 },
      irrigablePatches: [{ x: 0, y: 0 }],
    }).value as Garden;

    const robotOrError = Robot.create(garden);
    const robot = robotOrError.isRight() ? robotOrError.value : null;

    const moveOrError = robot.move();

    expect(robot.heading).toEqual('N');
    expect(moveOrError.isRight()).toBeTruthy();
    expect(robot.movements).toEqual(['N']);
  });
});
