import { Robot } from '../domain/robot/robot';

export interface ISaveRobotRepository {
  save(robot: Robot): Promise<void>;
}
