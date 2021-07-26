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
        }
      }
    }

    return { movements: robot.movements, finalHeading: robot.heading };
  }
}
