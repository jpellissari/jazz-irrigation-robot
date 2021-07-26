import { Robot } from '../../domain/robot/robot';

export type ResolvePathResponse = {
  movements: string[];
  finalHeading: string;
};

export interface IResolvePathUseCase {
  execute(robot: Robot): Promise<ResolvePathResponse>;
}
