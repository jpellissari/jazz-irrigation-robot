import { Robot } from '../domain/robot/robot';

export interface IGetRobotRepository {
  get(): Promise<Robot>;
}
