import { Robot } from '../../../domain/robot/robot';
import {
  IResolvePathUseCase,
  ResolvePathResponse,
} from '../../protocols/resolve-path-use-case';

export class ResolvePathUseCase implements IResolvePathUseCase {
  constructor(private robot: Robot) {}
  async execute(): Promise<ResolvePathResponse> {
    const gardenIrrigablePatches = this.robot.gardenIrrigablePatches;

    for (const irrigablePatch of gardenIrrigablePatches) {
      if (irrigablePatch.x > this.robot.position.x) {
        this.turnRobotEast();
      } else if (irrigablePatch.x < this.robot.position.x) {
        this.turnRobotWest();
      }
    }

    return {
      movements: this.robot.movements,
      finalHeading: this.robot.heading,
    };
  }

  private turnRobotWest(): void {
    if (this.robot.heading === 'N') {
      this.robot.turnLeft();
    } else if (this.robot.heading === 'S') {
      this.robot.turnRight();
    } else if (this.robot.heading === 'L') {
      this.robot.turnLeft();
      this.robot.turnLeft();
    }
  }

  private turnRobotEast(): void {
    if (this.robot.heading === 'N') {
      this.robot.turnRight();
    } else if (this.robot.heading === 'S') {
      this.robot.turnLeft();
    } else if (this.robot.heading === 'O') {
      this.robot.turnLeft();
      this.robot.turnLeft();
    }
  }
}
