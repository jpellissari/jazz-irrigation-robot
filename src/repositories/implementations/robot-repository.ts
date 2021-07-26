import { Robot } from '../../domain/robot/robot';
import { IGetRobotRepository } from '../get-robot';
import { ISaveRobotRepository } from '../save-robot';

export class RobotRepository
  implements ISaveRobotRepository, IGetRobotRepository
{
  private robot: Robot;

  async get(): Promise<Robot> {
    return this.robot;
  }

  async save(robot: Robot): Promise<void> {
    this.robot = robot;
  }
}
