import { GardenRepository } from '../../../repositories/implementations/garden-repository';
import { CreateGardenController } from './create-garden-controller';
import { CreateGardenUseCase } from './create-garden-use-case';

const gardenRepository = new GardenRepository();
const createGardenUseCase = new CreateGardenUseCase(gardenRepository);

const createGardenController = new CreateGardenController(createGardenUseCase);

export { createGardenController };
