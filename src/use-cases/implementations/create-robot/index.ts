import {
  createGardenRepositorySingleton,
  createRobotRepositorySingleton,
} from '../../../repositories/implementations';
import { CreateRobotController } from './create-robot-controller';
import { CreateRobotUseCase } from './create-robot-use-case';

const createRobotUseCase = new CreateRobotUseCase(
  createGardenRepositorySingleton,
  createRobotRepositorySingleton,
);

const createRobotController = new CreateRobotController(createRobotUseCase);

export { createRobotController };
