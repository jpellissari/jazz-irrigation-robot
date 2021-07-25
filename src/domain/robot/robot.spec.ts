import { left } from '../../core/either';
import { InvalidHeadingError } from './errors/invalid-heading-error';
import { Robot } from './robot';

const makeFakeCreateRobotDTO = ({ heading = 'N' }: any): any => ({
  heading,
});

describe('Robot Entity', () => {
  test('should not be possible to create a robot with invalid heading', () => {
    const robotOrError = Robot.create(
      makeFakeCreateRobotDTO({ heading: 'invalid_heading' }),
    );

    expect(robotOrError.isLeft()).toBeTruthy();
    expect(robotOrError).toEqual(left(new InvalidHeadingError()));
  });
});
