import { createGardenRepositorySingleton } from '../../../repositories/implementations';
import { RobotRepository } from '../../../repositories/implementations/robot-repository';
import { CreateRobotController } from './create-robot-controller';
import { CreateRobotUseCase } from './create-robot-use-case';

const robotRepository = new RobotRepository();
const createRobotUseCase = new CreateRobotUseCase(
  createGardenRepositorySingleton,
  robotRepository,
);

const createRobotController = new CreateRobotController(createRobotUseCase);

export { createRobotController };
