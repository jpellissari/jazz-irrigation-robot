import { GardenRepository } from './garden-repository';
import { RobotRepository } from './robot-repository';

const createGardenRepositorySingleton = new GardenRepository();

const createRobotRepositorySingleton = new RobotRepository();

export { createGardenRepositorySingleton, createRobotRepositorySingleton };
