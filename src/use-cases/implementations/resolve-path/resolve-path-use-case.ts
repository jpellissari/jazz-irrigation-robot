import { Robot } from '../../../domain/robot/robot';
import {
  IResolvePathUseCase,
  ResolvePathResponse,
} from '../../protocols/resolve-path-use-case';

export class ResolvePathUseCase implements IResolvePathUseCase {
  async execute(robot: Robot): Promise<ResolvePathResponse> {
    const gardenIrrigablePatches = robot.gardenIrrigablePatches;

    for (const irrigablePatch of gardenIrrigablePatches) {
      if (irrigablePatch.x > robot.position.x) {
        if (robot.heading === 'N') {
          robot.turnRight();
        } else if (robot.heading === 'S') {
          robot.turnLeft();
        } else if (robot.heading === 'O') {
          robot.turnLeft();
          robot.turnLeft();
        }
      } else if (irrigablePatch.x < robot.position.x) {
        if (robot.heading === 'N') {
          robot.turnLeft();
        } else if (robot.heading === 'S') {
          robot.turnRight();
        } else if (robot.heading === 'L') {
          robot.turnLeft();
          robot.turnLeft();
        }
      }
    }

    return { movements: robot.movements, finalHeading: robot.heading };
  }
}
