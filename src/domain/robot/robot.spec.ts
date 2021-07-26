import { Garden } from '../garden/garden';
import { CreateRobotDTO, Robot } from './robot';

const makeFakeCreateRobotDTO = (
  irrigablePatches = [{ x: 0, y: 0 }],
  size = { width: 2, height: 2 },
  initialPosition = { x: 0, y: 0 },
  initialHeading = 'N',
): CreateRobotDTO => {
  const garden = Garden.create({
    size,
    irrigablePatches,
  }).value as Garden;

  return {
    garden,
    initialPosition,
    initialHeading,
  };
};
describe('Robot Entity', () => {
  test('should create a robot on success', () => {
    const robotOrError = Robot.create(makeFakeCreateRobotDTO());

    expect(robotOrError.isRight()).toBeTruthy();
  });

  test("should return robot's garden size on success", () => {
    const robotOrError = Robot.create(makeFakeCreateRobotDTO());
    const robot = robotOrError.isRight() ? robotOrError.value : null;

    expect(robot.gardenSize).toEqual({ width: 2, height: 2 });
  });

  test("should return robot's position on success", () => {
    const robotOrError = Robot.create(makeFakeCreateRobotDTO());
    const robot = robotOrError.isRight() ? robotOrError.value : null;

    expect(robot.position).toEqual({ x: 0, y: 0 });
  });

  test("should return robot's heading on success", () => {
    const robotOrError = Robot.create(makeFakeCreateRobotDTO());
    const robot = robotOrError.isRight() ? robotOrError.value : null;

    expect(robot.heading).toEqual('N');
  });

  test('should not move robot one position to north if out of bounds', () => {
    const robotOrError = Robot.create(makeFakeCreateRobotDTO([{ x: 1, y: 1 }]));
    const robot = robotOrError.isRight() ? robotOrError.value : null;

    robot.move();
    const moveOrError = robot.move();

    expect(robot.heading).toEqual('N');
    expect(moveOrError.isLeft()).toBeTruthy();
    expect(robot.movements).toEqual(['N']);
  });

  test('should change turn left on success', () => {
    const robotOrError = Robot.create(makeFakeCreateRobotDTO());
    const robot = robotOrError.isRight() ? robotOrError.value : null;

    const changeHeadingOrError = robot.turnLeft();

    expect(robot.heading).toEqual('O');
    expect(changeHeadingOrError.isRight()).toBeTruthy();
    expect(robot.movements).toEqual(['I', 'E']);
  });

  test('should turn right on success', () => {
    const robotOrError = Robot.create(makeFakeCreateRobotDTO());
    const robot = robotOrError.isRight() ? robotOrError.value : null;

    const changeHeadingOrError = robot.turnRight();

    expect(robot.heading).toEqual('L');
    expect(changeHeadingOrError.isRight()).toBeTruthy();
    expect(robot.movements).toEqual(['I', 'D']);
  });

  test('should not move robot one position to south if out of bounds', () => {
    const robotOrError = Robot.create(makeFakeCreateRobotDTO());
    const robot = robotOrError.isRight() ? robotOrError.value : null;

    robot.turnLeft();
    robot.turnLeft();

    const moveOrError = robot.move();

    expect(robot.heading).toEqual('S');
    expect(moveOrError.isLeft()).toBeTruthy();
  });

  test('should not move robot one position to west if out of bounds', () => {
    const robotOrError = Robot.create(makeFakeCreateRobotDTO());
    const robot = robotOrError.isRight() ? robotOrError.value : null;

    robot.turnLeft();

    const moveOrError = robot.move();

    expect(robot.heading).toEqual('O');
    expect(moveOrError.isLeft()).toBeTruthy();
  });

  test('should not move robot one position to east if out of bounds', () => {
    const robotOrError = Robot.create(makeFakeCreateRobotDTO());
    const robot = robotOrError.isRight() ? robotOrError.value : null;

    robot.turnRight();

    robot.move();
    const moveOrError = robot.move();

    expect(robot.heading).toEqual('L');
    expect(moveOrError.isLeft()).toBeTruthy();
  });

  test('should move robot one position to north on success', () => {
    const robotOrError = Robot.create(makeFakeCreateRobotDTO([{ x: 1, y: 1 }]));
    const robot = robotOrError.isRight() ? robotOrError.value : null;

    const moveOrError = robot.move();

    expect(robot.heading).toEqual('N');
    expect(moveOrError.isRight()).toBeTruthy();
    expect(robot.movements).toEqual(['N']);
  });

  test('should be able to find for irrigable patch on heading direction', () => {
    const robotOrError = Robot.create(
      makeFakeCreateRobotDTO(
        [{ x: 1, y: 1 }],
        { width: 4, height: 4 },
        { x: 1, y: 3 },
      ),
    );
    const robot = robotOrError.isRight() ? robotOrError.value : null;

    const searchOrError = robot.searchOnColumn();

    expect(robot.heading).toEqual('N');
    expect(searchOrError.isRight()).toBeTruthy();
    expect(searchOrError.value).toEqual({ x: 1, y: 1 });
  });

  test('should be able to irrigate patch on success', () => {
    const robotOrError = Robot.create(makeFakeCreateRobotDTO());
    const robot = robotOrError.isRight() ? robotOrError.value : null;

    expect(robot.heading).toEqual('N');
    expect(robot.movements).toEqual(['I']);
  });
});
