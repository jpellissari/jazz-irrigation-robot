import { Robot } from '../../domain/robot/robot';
import { ISaveRobotRepository } from '../save-robot';

export class RobotRepository implements ISaveRobotRepository {
  private robot: Robot;

  async save(robot: Robot): Promise<void> {
    this.robot = robot;
  }
}
