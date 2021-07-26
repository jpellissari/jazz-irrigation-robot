import { GardenRepository } from '../../../repositories/implementations/garden-repository';
import { RobotRepository } from '../../../repositories/implementations/robot-repository';
import { CreateGardenUseCase } from '../create-garden/create-garden-use-case';
import { CreateRobotUseCase } from '../create-robot/create-robot-use-case';
import { ResolvePathController } from './resolve-path-controller';
import { ResolvePathUseCase } from './resolve-path-use-case';

const gardenRepository = new GardenRepository();
const createGardenUseCase = new CreateGardenUseCase(gardenRepository);

const robotRepository = new RobotRepository();
const createRobotUseCase = new CreateRobotUseCase(robotRepository);

const resolvePathUseCase = new ResolvePathUseCase();

const resolvePathController = new ResolvePathController(
  createGardenUseCase,
  createRobotUseCase,
  resolvePathUseCase,
);

export { resolvePathController };
